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
  fr: {
    label: "NOTE DE TRANSPARENCE",
    body: "Ces projets sont en cours de développement et ne prétendent pas à une maîtrise professionnelle complète. Je construis pour apprendre, j'utilise les LLM comme outils de développement et j'assume la responsabilité de mes décisions d'architecture, de la conception du système et du cadre technique. J'apprends en continu, je cherche à acquérir des connaissances professionnelles solides par le LAB, et le travail d'ingénierie qui reste à faire me motive.",
  },
} as const;

export const transparencyTitle = {
  en: "Transparency & Development Approach",
  de: "Transparenz & Entwicklungsansatz",
  fr: "Transparence et démarche de développement",
} as const;

/** Shown in the active language. The English wording is the supplied text. */
export const verificationWorkflow = {
  en: {
    title: "My workflow",
    paragraphs: [
    "My workflow is to implement the change, verify it locally, review the code, and then move through the Git and deployment process.",
    "First, I run the relevant automated tests, type checks, linting and build. I also run the application locally and test the actual user flow, including error handling and edge cases.",
    "Before committing, I inspect the Git status and diff to make sure I'm committing only the intended changes, without secrets or unrelated modifications. I use pre-commit checks where they're configured.",
    "After committing, I push the feature branch and review the CI results and code changes. Before production, I prefer to validate the application in a staging environment, including API integration, database compatibility, configuration and health checks.",
    "After deployment, I check logs, application health and critical user flows. I also consider how to roll back if the deployment introduces a regression.",
    "I don't assume that one successful test means everything is correct. I use several layers of verification, and I distinguish between what I've actually tested and what still needs testing.",
    ],
  },
  de: {
    title: "Mein Arbeitsablauf",
    paragraphs: [
      "Mein Arbeitsablauf ist: die Änderung umsetzen, sie lokal prüfen, den Code durchsehen und danach den Git- und Bereitstellungsprozess durchlaufen.",
      "Zuerst führe ich die relevanten automatisierten Tests, die Typprüfung, das Linting und den Build aus. Ich starte die Anwendung außerdem lokal und prüfe den tatsächlichen Nutzerablauf, einschließlich Fehlerbehandlung und Grenzfällen.",
      "Vor dem Commit sehe ich mir den Git-Status und den Diff an, damit ich nur die beabsichtigten Änderungen committe, ohne Geheimnisse oder sachfremde Änderungen. Wo Pre-Commit-Prüfungen eingerichtet sind, nutze ich sie.",
      "Nach dem Commit pushe ich den Feature-Branch und prüfe die CI-Ergebnisse und die Codeänderungen. Vor der Produktion validiere ich die Anwendung bevorzugt in einer Staging-Umgebung, einschließlich API-Anbindung, Datenbankkompatibilität, Konfiguration und Health-Checks.",
      "Nach der Bereitstellung prüfe ich Logs, den Zustand der Anwendung und kritische Nutzerabläufe. Ich überlege auch, wie ein Rollback aussieht, falls die Bereitstellung eine Regression einführt.",
      "Ich gehe nicht davon aus, dass ein erfolgreicher Test bedeutet, alles sei korrekt. Ich nutze mehrere Prüfungsebenen und unterscheide zwischen dem, was ich tatsächlich getestet habe, und dem, was noch zu testen ist.",
    ],
  },
  fr: {
    title: "Mon processus",
    paragraphs: [
      "Mon processus consiste à implémenter le changement, le vérifier localement, relire le code, puis suivre le processus Git et de déploiement.",
      "D'abord, j'exécute les tests automatisés concernés, les contrôles de types, le lint et le build. Je lance aussi l'application en local et je teste le parcours réel, y compris la gestion des erreurs et les cas limites.",
      "Avant de committer, j'examine le statut Git et le diff pour ne committer que les changements voulus, sans secrets ni modifications hors sujet. J'utilise les contrôles de pre-commit lorsqu'ils sont configurés.",
      "Après le commit, je pousse la branche de fonctionnalité et je revois les résultats de CI et les changements de code. Avant la production, je préfère valider l'application dans un environnement de préproduction, y compris l'intégration des API, la compatibilité de la base, la configuration et les contrôles de santé.",
      "Après le déploiement, je vérifie les journaux, l'état de l'application et les parcours critiques. Je prévois aussi comment revenir en arrière si le déploiement introduit une régression.",
      "Je ne suppose pas qu'un test réussi signifie que tout est correct. J'utilise plusieurs niveaux de vérification et je distingue ce que j'ai réellement testé de ce qui reste à tester.",
    ],
  },
} as const;

export const transparencyWorkflowLink = {
  en: "The NexusOS workflow section describes the development process. It is not evidence that a feature is operational. Implemented work, verification and production readiness stay separate.",
  de: "Der Abschnitt zum NexusOS-Arbeitsablauf beschreibt den Entwicklungsprozess. Er ist kein Nachweis, dass eine Funktion betriebsbereit ist. Umgesetzte Arbeit, Überprüfung und Produktionsreife bleiben getrennt.",
  fr: "La section sur le processus NexusOS décrit la démarche de développement. Elle ne prouve pas qu'une fonction est opérationnelle. Le travail implémenté, la vérification et la maturité de production restent distincts.",
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
  fr: [
    {
      heading: "Apprendre en construisant",
      paragraphs: [
        "Je considère le développement logiciel comme un processus continu de construction, de questionnement, de test et d'amélioration. Ces projets sont des environnements d'apprentissage concrets : j'y travaille l'architecture logicielle, j'intègre des technologies, je prends en charge des problèmes techniques et je comprends mieux comment les systèmes se comportent réellement.",
        "Je veux être transparent sur ce que ces projets montrent — et sur ce qu'ils ne revendiquent pas.",
      ],
    },
    {
      heading: "Mon rôle et l'usage des LLM",
      paragraphs: [
        "J'utilise les grands modèles de langage (Large Language Models, LLM) comme outils de développement : pour soutenir l'implémentation, examiner des problèmes, comparer des approches et approfondir ma compréhension de technologies nouvelles. Le code et les explications générés peuvent être faux, incomplets ou mal adaptés à une architecture donnée. Il faut les relire et les vérifier, pas les accepter tels quels.",
        "Ma contribution porte sur l'architecture logicielle, la conception du système, les décisions techniques, les exigences et les contraintes, la gouvernance, et le jugement sur la façon dont les pièces s'assemblent. Je travaille à comprendre les systèmes que je construis, à trouver leurs faiblesses, à examiner les défaillances de façon systématique et à confronter le comportement réel aux tests et aux éléments dont je dispose.",
        "La part de travail qui est la mienne varie selon le projet. Je ne présente pas le développement assisté par IA comme la preuve que j'ai écrit chaque ligne de façon indépendante. Je ne revendique pas non plus une expertise complète de chaque technologie utilisée. Ce que je revendique, c'est de comprendre les systèmes que je construis et d'assumer la responsabilité de leur qualité technique, de leurs limites et de leur évolution.",
      ],
    },
    {
      heading: "Pourquoi montrer des projets inachevés",
      paragraphs: [
        "Je présente aussi des projets encore en développement, parce que je veux montrer autre chose qu'une interface finie ou une présentation soignée. Je veux que des employeurs voient comment j'aborde des exigences complexes, comment je structure une application, comment je pèse les décisions d'architecture, comment j'intègre des composants et comment je reconnais ce qu'il reste à construire.",
        "Un projet inachevé peut tout de même montrer une initiative technique et une capacité à résoudre des problèmes. Une fonction implémentée n'est pas automatiquement une fonction vérifiée, et une base de code volumineuse ne signifie pas qu'un système est prêt pour la production.",
        "Pour chaque projet, je veux que l'état actuel, les fonctions déjà construites, les éléments de preuve, les limites connues, les blocages ouverts et les prochaines étapes nécessaires soient documentés clairement. Lorsqu'un contrôle est encore en attente, je le dis au lieu de présenter une hypothèse comme un fait.",
      ],
    },
    {
      heading: "Comment j'apprends",
      paragraphs: [
        "Je suis en chemin pour devenir développeur logiciel, et je sais qu'il me reste beaucoup à apprendre. Je veux approfondir les bases techniques, mieux juger des approches différentes et appliquer plus régulièrement une pratique professionnelle solide.",
        "C'est une des raisons pour lesquelles j'ai choisi la voie du LAB : je veux étendre ce que je sais par un apprentissage structuré et par l'expérience pratique, consolider les bases et me préparer délibérément aux exigences du développement logiciel professionnel.",
        "Je suis curieux du fonctionnement des systèmes, j'aime les problèmes techniques difficiles et je suis motivé à continuer d'améliorer la qualité du travail. Trouver une limite ou un défaut n'est pas quelque chose à cacher. C'est une occasion d'apprendre et de construire une meilleure solution.",
      ],
    },
    {
      heading: "Un compte rendu honnête de l'avancement",
      paragraphs: [
        "Un pourcentage d'avancement doit décrire l'état documenté d'un périmètre de projet clairement défini — pas ma compétence personnelle et pas le volume de code écrit. Il doit reposer sur des critères que l'on peut suivre et sur les éléments disponibles. Lorsque l'information ne suffit pas à une évaluation défendable, l'avancement reste non évalué.",
        "Je distingue l'avancement de l'implémentation, la vérification technique et la maturité de production. Une fonction peut être implémentée et rester non testée. Une application peut fonctionner en local et échouer à l'intégration ou au déploiement. Un projet techniquement substantiel peut rester impropre à un usage en production.",
        "Le but n'est pas de présenter chaque projet comme terminé. Je veux montrer ce que je sais construire, comment j'aborde les problèmes techniques, ce que je comprends aujourd'hui et comment je compte continuer à progresser.",
      ],
    },
  ],
} as const;
