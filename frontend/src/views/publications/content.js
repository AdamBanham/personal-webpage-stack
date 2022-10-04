
class Paper {
    constructor(key, title, authors, year, abstract, file, venue, doi, bibtex){
        this.key = key;
        this.title = title;
        this.authors = authors;
        this.year = year;
        this.abstract = abstract;
        this.file = file;
        this.venue = venue;
        this.doi = doi;
        this.bibtex = bibtex;
    }
}

var papers = [
    new Paper(
        "ICPM2021-EDBA2021",
        "xPM: A Framework for Process Mining with Exogenous Data",
        ["Adam Banham", "Sander J.J. Leemans", "Moe T. Wynn", "Robert Andrews"],
        "2021",
        `Process mining facilitates analysis of business processes using event 
        logs derived from historical records of process executions stored in 
        organisations' information systems. Most existing process mining 
        techniques only consider data  directly related to process execution 
        (endogenous data). Data not directly representable as attributes of 
        either events or traces (which includes exogenous data), are generally
         not considered. Exogenous data may be used by process participants 
         in making decisions about execution paths. However, as exogenous data
         is not represented in event logs, its impact on such decision making is
         opaque and cannot currently be assessed by existing process mining 
        techniques. This paper shows how exogenous data can be used in process 
        mining, in particular discovery and enhancement techniques, to understand
         its influence on process decisions. In particular, we focus on time series
         which represent periodic observations of e.g. weather measurements, city 
        health alerts or patient vital signs. We show that exogenous time series can
         be aligned and transformed into new attributes to annotate events in an 
        event log. Then, we use these attributes to discover preconditions in a 
        Petri net with exogenous data (xDPN), thus revealing the exogenous data's 
        influence on the process.`,
        "papers/2021/EDBA/ICPM2021____EDBA___A_Framework_for_Process_Mining_with_Exogenous_Data.pdf",
        "EDBA @ ICPM",
        "https://doi.org/10.1007/978-3-030-98581-3_7",
        "bibtex/2021/ICPM2021.bib"
    ),
    new Paper(
        "AIIM2022a",
        "xPM: Enhancing Exogenous Data Visibility",
        ["Adam Banham", "Sander J.J. Leemans", "Moe T. Wynn", "Robert Andrews",
         "Kevin B. Laupland", "Lucy Shinners"],
        "2022",
        `Process mining is a well-established discipline with applications in 
        many industry sectors, including healthcare.
        To date, few publications have considered the context in which 
        processes execute. 
        Little consideration has been given as to how contextual data 
        (exogenous data) can be practically included for process mining 
        analysis, beyond including case or event attributes in a typical 
        event log.
        We show that the combination of process data (endogenous) and 
        exogenous data can generate insights not possible with standard 
        process mining techniques.
        Our contributions are a framework for process mining with 
        exogenous data and new analyses, where exogenous data and process 
        behaviour are linked to process outcomes.
        Our new analyses visualise exogenous data, highlighting the trends 
        and variations, to show where overlaps or distinctions exist between 
        outcomes.
        We applied our analyses in a healthcare setting and show that clinicians
         could extract insights about differences in patients’ vital signs 
         (exogenous data) relevant to clinical outcomes.
        We present two evaluations, using a publicly available data set, 
        MIMIC--III, to demonstrate the applicability of our analysis. 
        These evaluations show that process mining can integrate large 
        amounts of physiologic data and interventions, with resulting 
        discrimination and conversion to clinically interpretable information.`,
        "papers/2022/AIIM-SI/AIIM___VSI_KRR___Enhancing_Exogenous_Data_Visibility.pdf",
        "Artifical Intelligence in Medicine - Special Issue - Knowledge Representation and Reasoning for Healthcare Processes",
        "https://doi.org/10.1016/j.artmed.2022.102409"
    ),
]

papers = papers.sort((a,b) => b.year- a.year)

export default {
    Papers: papers
}