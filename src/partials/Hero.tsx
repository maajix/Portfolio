import {
  GradientText,
  HeroAvatar,
  HeroSocial,
  Section,
} from 'astro-boilerplate-components';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm Max or <GradientText>Majix</GradientText> 🖖
        </>
      }
      description={
        <>
          I'm a passionate penetration tester with extensive experience in web security. 
          I love exploring IT security, and I'm always excited to share my projects and knowledge. 
          Check out my work and connect with me on social media!
        </>
      }
      avatar={
        <img
          className="rounded-full h-48 w-48 shadow-lg mt-10" // Added shadow class
          src="/assets/images/avatar.svg" // Updated path to the provided SVG avatar image
          alt="Majix avatar"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          <a href="https://x.com/majix_de">
            <HeroSocial
              src="/assets/images/twitter-icon.png"
              alt="X icon"
            />
          </a>
          <a href="https://github.com/maajix">
            <HeroSocial
              src="/assets/images/github-icon.png"
              alt="GitHub icon"
            />
          </a>
          <a href="https://medium.com/@majix_de" className='ml-1'>
            <HeroSocial
              src="/assets/images/medium-icon.png"
              alt="Medium icon"
            />
          </a>
        </>
      }
    />
  </Section>
);

export { Hero };
