/**
 * Approved transparency copy only.
 * The detailed English disclaimer is not in this repository or the supplied
 * source text, so English has the opening statement and the tab title, and
 * no detailed body.
 */

export const transparencyOpening = {
  en: "[TRANSPARENCY NOTE — These projects are works in progress, not claims of professional mastery. I build to learn, use LLMs as development tools, and take responsibility for my architectural decisions, system design and governance. I am continuously learning, actively seeking deeper professional knowledge through the LAB, and motivated by the engineering work still ahead.]",
  de: "[TRANSPARENZHINWEIS — Diese Projekte befinden sich in Entwicklung und sind kein Anspruch auf umfassende professionelle Expertise. Ich lerne durch praktisches Entwickeln, nutze LLMs als Entwicklungswerkzeuge und übernehme Verantwortung für meine Architekturentscheidungen, mein Systemdesign und die technischen Rahmenbedingungen. Ich lerne kontinuierlich weiter, möchte durch das LAB fundiertes professionelles Wissen aufbauen und sehe die noch vor mir liegenden technischen Herausforderungen als Antrieb.]",
} as const;

export const transparencyTitle = {
  en: "Transparency & Development Approach",
  de: "Transparenz & Entwicklungsansatz",
} as const;

export const transparencyDetail = {
  en: null,
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
