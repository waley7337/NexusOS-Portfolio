/**
 * Transparency copy.
 * The opening statements and the German detail are the supplied text.
 * The English detail follows that German text so both languages have the
 * short note and the detailed section. Labels stay unbracketed.
 */

export const transparencyOpening = {
  en: {
    label: "TRANSPARENCY NOTE",
    body: "These projects are works in progress, not claims of professional mastery. I build to learn, use LLMs as development tools, and take responsibility for my architectural decisions, system design and governance. I am continuously learning, actively seeking deeper professional knowledge through the LAB, and motivated by the engineering work still ahead.",
  },
  de: {
    label: "TRANSPARENZHINWEIS",
    body: "Diese Projekte befinden sich in Entwicklung und sind kein Anspruch auf umfassende professionelle Expertise. Ich lerne durch praktisches Entwickeln, nutze LLMs als Entwicklungswerkzeuge und übernehme Verantwortung für meine Architekturentscheidungen, mein Systemdesign und die technischen Rahmenbedingungen. Ich lerne kontinuierlich weiter, möchte durch das LAB fundiertes professionelles Wissen aufbauen und sehe die noch vor mir liegenden technischen Herausforderungen als Antrieb.",
  },
} as const;

export const transparencyTitle = {
  en: "Transparency & Development Approach",
  de: "Transparenz & Entwicklungsansatz",
} as const;

/** Supplied in English only. It is not shown in the German view. */
export const verificationWorkflow = {
  title: "My workflow",
  paragraphs: [
    "My workflow is to implement the change, verify it locally, review the code, and then move through the Git and deployment process.",
    "First, I run the relevant automated tests, type checks, linting and build. I also run the application locally and test the actual user flow, including error handling and edge cases.",
    "Before committing, I inspect the Git status and diff to make sure I'm committing only the intended changes, without secrets or unrelated modifications. I use pre-commit checks where they're configured.",
    "After committing, I push the feature branch and review the CI results and code changes. Before production, I prefer to validate the application in a staging environment, including API integration, database compatibility, configuration and health checks.",
    "After deployment, I check logs, application health and critical user flows. I also consider how to roll back if the deployment introduces a regression.",
    "I don't assume that one successful test means everything is correct. I use several layers of verification, and I distinguish between what I've actually tested and what still needs testing.",
  ],
} as const;

export const transparencyWorkflowLink = {
  en: "The NexusOS workflow section describes the development process. It is not evidence that a feature is operational. Implemented work, verification and production readiness stay separate.",
  de: "Der Abschnitt zum NexusOS-Arbeitsablauf beschreibt den Entwicklungsprozess. Er ist kein Nachweis, dass eine Funktion betriebsbereit ist. Umgesetzte Arbeit, Überprüfung und Produktionsreife bleiben getrennt.",
} as const;

export const transparencyDetail = {
  en: [
    {
      heading: "Learning by building",
      paragraphs: [
        "I treat software development as a continuous process of building, questioning, testing and improving. These projects are practical learning environments: I work through software architecture, integrate technologies, take on technical problems and develop a clearer understanding of how systems actually behave.",
        "I want to be transparent about what these projects show — and what they do not claim.",
      ],
    },
    {
      heading: "My role and the use of LLMs",
      paragraphs: [
        "I use large language models as development tools: to support implementation, investigate problems, compare alternative approaches and deepen my understanding of new technologies. Generated code and explanations can be wrong, incomplete or a poor fit for a given architecture. They have to be reviewed and verified rather than accepted as they are.",
        "My contribution is the software architecture, the system design, the technical decisions, the requirements and constraints, the governance, and the judgement of how the pieces fit together. I work to understand the systems I build, to find weaknesses, to investigate failures systematically and to check real behaviour against tests and the evidence I have.",
        "The share of work that is mine varies by project. I do not present AI-assisted development as proof that I wrote every line independently. I also do not claim comprehensive expertise in every technology in use. What I do claim is that I understand the systems I build and that I take responsibility for their technical quality, their limits and their further development.",
      ],
    },
    {
      heading: "Why unfinished projects are shown",
      paragraphs: [
        "I also present projects that are still in development, because I want to show more than a finished interface or a polished presentation. I want employers to see how I approach complex requirements, structure an application, weigh architecture decisions, integrate components and recognise what still has to be built.",
        "An unfinished project can still show technical initiative and problem-solving. Implemented functionality is not automatically verified functionality, and a large codebase does not mean a system is ready for production.",
        "For each project I want the current state, the functions already built, the evidence, the known limits, the open blockers and the next necessary steps to be documented plainly. Where a check is still outstanding, I say so instead of presenting an assumption as a fact.",
      ],
    },
    {
      heading: "How I am learning",
      paragraphs: [
        "I am on the path to becoming a software developer, and I know I still have a great deal to learn. I want to deepen the technical foundations, get better at judging different approaches and apply sound professional practice more consistently.",
        "That is one reason I chose the LAB route: I want to extend what I know through structured learning and practical experience, to firm up the foundations and to prepare deliberately for the demands of professional software development.",
        "I am curious about how systems work, I like difficult technical problems, and I am motivated to keep improving the quality of the work. Finding a limitation or a defect is not something to hide. It is a chance to learn and to build a better solution.",
      ],
    },
    {
      heading: "An honest account of progress",
      paragraphs: [
        "A completion percentage is meant to describe the documented state of a clearly defined project scope — not my personal competence and not the volume of code written. It should rest on criteria that can be followed and on the evidence available. When the information is not enough for a defensible assessment, the progress stays unset.",
        "I distinguish implementation progress, technical verification and production readiness. A function can be implemented and still untested. An application can work locally and still fail in integration or deployment. A technically substantial project can still be unfit for production use.",
        "The aim is not to present every project as finished. I want to show what I can build, how I approach technical problems, what I understand today and how I intend to keep developing.",
      ],
    },
  ],
  de: [
    {
      heading: "Lernen durch praktisches Entwickeln",
      paragraphs: [
        "Ich verstehe Softwareentwicklung als einen kontinuierlichen Prozess des Entwickelns, Hinterfragens, Testens und Verbesserns. Meine Projekte sind praktische Lernumgebungen, in denen ich mich mit Softwarearchitektur auseinandersetze, Technologien integriere, technische Herausforderungen bearbeite und ein tieferes Verständnis für das Verhalten von Softwaresystemen entwickle.",
        "Mir ist wichtig, transparent darzustellen, was diese Projekte zeigen – und was sie nicht beanspruchen.",
      ],
    },
    {
      heading: "Meine Rolle und der Einsatz von LLMs",
      paragraphs: [
        "Ich nutze große Sprachmodelle (Large Language Models, LLMs) als Entwicklungswerkzeuge, um die Implementierung zu unterstützen, Probleme zu untersuchen, alternative Lösungsansätze zu vergleichen und mein Verständnis neuer Technologien zu vertiefen. Mir ist bewusst, dass generierter Code und entsprechende Erklärungen fehlerhaft, unvollständig oder für eine bestimmte Architektur ungeeignet sein können. Deshalb müssen sie kritisch geprüft und verifiziert werden, anstatt sie ungeprüft zu übernehmen.",
        "Zu meinem Beitrag gehören die Planung der Softwarearchitektur, das Systemdesign, technische Entscheidungen, die Definition von Anforderungen und Rahmenbedingungen, Governance sowie die Bewertung des Zusammenspiels der einzelnen Systemkomponenten. Ich arbeite daran, die von mir entwickelten Systeme zu verstehen, Schwachstellen zu erkennen, Fehler systematisch zu untersuchen und das tatsächliche Verhalten anhand von Tests und verfügbaren Nachweisen zu überprüfen.",
        "Der genaue Anteil meiner eigenen Arbeit unterscheidet sich je nach Projekt. Ich stelle KI-gestützte Entwicklung nicht als Beweis dafür dar, jede Codezeile unabhängig selbst geschrieben zu haben. Ebenso beanspruche ich keine umfassende Expertise in sämtlichen verwendeten Technologien. Mein Anspruch ist es, die von mir entwickelten Systeme zu verstehen und Verantwortung für ihre technische Qualität, ihre Grenzen und ihre Weiterentwicklung zu übernehmen.",
      ],
    },
    {
      heading: "Warum ich auch unfertige Projekte zeige",
      paragraphs: [
        "Ich präsentiere auch Projekte, die sich noch in Entwicklung befinden, weil ich mehr zeigen möchte als eine fertige Benutzeroberfläche oder eine überzeugende Präsentation. Ich möchte Arbeitgebern Einblick geben, wie ich komplexe Anforderungen angehe, Anwendungen strukturiere, Architekturentscheidungen abwäge, Komponenten integriere und weiteren Entwicklungsbedarf erkenne.",
        "Auch ein unfertiges Projekt kann technische Eigeninitiative und Problemlösungskompetenz sichtbar machen. Implementierte Funktionalität ist jedoch nicht automatisch verifizierte Funktionalität, und ein umfangreicher Codebestand bedeutet nicht zwangsläufig, dass ein System produktionsreif ist.",
        "Deshalb möchte ich für jedes Projekt den aktuellen Entwicklungsstand, die bereits umgesetzten Funktionen, die vorhandenen Nachweise, bekannte Einschränkungen, offene Hindernisse und die nächsten erforderlichen Schritte transparent dokumentieren. Wo eine Überprüfung noch aussteht, werde ich das ausdrücklich kenntlich machen, anstatt Annahmen als Tatsachen darzustellen.",
      ],
    },
    {
      heading: "Mein Lernweg",
      paragraphs: [
        "Ich befinde mich auf meinem Weg zum Software Developer und bin mir bewusst, dass ich noch viel zu lernen habe. Ich möchte meine technischen Grundlagen vertiefen, meine Fähigkeit zur Bewertung unterschiedlicher Lösungsansätze verbessern und zunehmend fundierte professionelle Entwicklungspraktiken anwenden.",
        "Das ist einer der Gründe, warum ich mich für den LAB-Weg entschieden habe: Ich möchte mein Wissen durch strukturiertes Lernen und praktische Erfahrung erweitern, meine Grundlagen festigen und mich gezielt auf die Anforderungen professioneller Softwareentwicklung vorbereiten.",
        "Ich bin neugierig darauf, wie Systeme funktionieren, beschäftige mich gerne mit anspruchsvollen technischen Problemen und bin motiviert, die Qualität meiner Arbeit kontinuierlich zu verbessern. Einschränkungen zu erkennen oder Fehler zu entdecken, sehe ich nicht als etwas, das verborgen werden sollte, sondern als Gelegenheit, daraus zu lernen und bessere Lösungen zu entwickeln.",
      ],
    },
    {
      heading: "Ein ehrlicher Umgang mit Fortschritt",
      paragraphs: [
        "Fortschrittsangaben in Prozent sollen den dokumentierten Umsetzungsstand eines klar definierten Projektumfangs darstellen – nicht meine persönliche Kompetenz oder die Menge des geschriebenen Codes. Sie sollten auf nachvollziehbaren Kriterien und verfügbaren Nachweisen beruhen. Reichen die Informationen für eine belastbare Bewertung nicht aus, bleibt der Fortschrittsstatus vorerst offen.",
        "Ich unterscheide zwischen Implementierungsfortschritt, technischer Verifizierung und Produktionsreife. Eine Funktion kann implementiert, aber noch ungetestet sein. Eine Anwendung kann lokal funktionieren und dennoch Probleme bei der Integration oder Bereitstellung haben. Und ein technisch umfangreiches Projekt kann weiterhin ungeeignet für den produktiven Einsatz sein.",
        "Mein Ziel ist nicht, jedes Projekt als abgeschlossen darzustellen. Ich möchte zeigen, was ich entwickeln kann, wie ich technische Herausforderungen angehe, was ich heute verstehe und wie ich mich fachlich weiterentwickeln möchte.",
      ],
    },
  ],
} as const;
