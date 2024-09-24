
import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from 'astro-boilerplate-components';

const ProjectList = () => (
  <Section
    title={
      <>
        Favourite <GradientText>Projects</GradientText>
      </>
    }
  >
    <div className="flex flex-col gap-6">
      <Project
        name="Intelligent and fast XSS Fuzzer"
        description="An XSS fuzzer that intelligently finds and exploits XSS vulnerabilities."
        link="/"
        img={{
          src: '/assets/images/xss_project_cover.png',
          alt: 'Intelligent XSS Fuzzer',
        }}
        category={
          <>
            <Tags color={ColorTags.LIME}>On hold </Tags>
            <Tags color={ColorTags.AMBER}>Private</Tags>
            <Tags color={ColorTags.EMERALD}>Web</Tags>
            <Tags color={ColorTags.SKY}>XSS</Tags>
            <Tags color={ColorTags.ROSE}>Fuzzer</Tags>
          </>
        }
      />
      <Project
        name="Pentest Automation Framework"
        description="Combine different tools, create workflows and automate pentest tasks. Directly access the results via the Web interface. Build with Docker."
        link="/"
        img={{
          src: '/assets/images/yektivity_project_cover.png',
          alt: 'Intelligent XSS Fuzzer',
        }}
        category={
          <>
            <Tags color={ColorTags.LIME}>On hold</Tags>
            <Tags color={ColorTags.AMBER}>Private</Tags>
            <Tags color={ColorTags.SKY}>Automation</Tags>
            <Tags color={ColorTags.ROSE}>Workflows</Tags>
            <Tags color={ColorTags.INDIGO}>Docker</Tags>            
          </>
        }
      />
      <Project
        name="OT Dashboard for SOC/SIEM"
        description="A dashboard for SOC/SIEM to visualize and analyze data from elasticsearch."
        link="/"
        img={{
          src: '/assets/images/dashboard_project.png',
          alt: 'Intelligent XSS Fuzzer',
        }}
        category={
          <>
            <Tags color={ColorTags.LIME}>Done</Tags>
            <Tags color={ColorTags.AMBER}>Private</Tags>
            <Tags color={ColorTags.EMERALD}>Apache ECharts</Tags>
            <Tags color={ColorTags.SKY}>Elastic</Tags>
            <Tags color={ColorTags.ROSE}>TailwindCSS</Tags>
            <Tags color={ColorTags.INDIGO}>FastAPI</Tags>
            <Tags color={ColorTags.EMERALD}>Flask</Tags>
          </>
        }
      />
    </div>
  </Section>
);

export { ProjectList };
