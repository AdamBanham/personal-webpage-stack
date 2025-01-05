import { ArticleStructure } from "../../articleElement.js";

const PhDConfirmation = new ArticleStructure(
    "Confirmation Seminar @ QUT",
    "confirmSeminar2022"
)

PhDConfirmation.addTextSection(
`
The confirmation of candidature for PhD candidates at Queensland University 
of Technology (QUT) represents a key milestone to ensure their future success. 
It occurs at the 12-month mark in the candidature, and the confirmation is an 
internal seminar to assess the candidate's current progress and the future 
aspirations of their research plan. The confirmation consists of a panel of 
peers, where one member is from the supervision team, one from the supporting 
school, and one member external to the supporting school. My consisted of the 
following members:
`
)

PhDConfirmation.addProfile(
"Professor Arthur ter Hofstede",
"arthur-ter-hofstede.jpg",
`
Arthur ter Hofstede is a professor in the Faculty of Science. From 2010-2018 
he was a Professor at Eindhoven University of Technology in the Netherlands. 
In 2010-2011 he was a Senior Visiting Scholar of Tsinghua University in China 
and in May 2010 a Visiting Professor of Sapienza University of Rome in Italy. 
Since 2015 he is a Visiting Professor of Sun Yat-sen University. His research
contritues to Conceptual, formal, and technological foundations of Business 
Process Automation (e.g. BPM in the cloud) as well as Process Mining, 
specifically data quality, comparative performance analysis,  process risk 
analysis, and visualisation. Work in the area of process automation centers 
on the YAWL (Yet Another Workflow Language) open source workflow management 
system, which is based on the well-known Workflow Patterns Initiative. This 
system is used in industry and provides a test bed for the application of new 
research ideas.
`,
"R"
)
PhDConfirmation.addProfile(
"Professor Richi Nayak",
"richi-nayak.jpg",
`
Prof. Richi Nayak is an internationally recognised expert in data mining, text mining 
and web intelligence. She has combined knowledge in these areas very 
successfully with diverse disciplines such as Social Science, Science, 
and Engineering for technology transfer to real-world problems to change 
their practices and methodologies. Her particular research interests are 
machine learning and in recent years she has concentrated her work on text 
mining, personalization, automation, and social network analysis. She has 
published high-quality conference and journal articles and is highly cited 
in her research field. She has received a number of awards and nominations 
for teaching, research and service activities. She is the Applied Data 
Science Program Leader of the University Centre for Data Science (CDS).
`,
"L"
)
PhDConfirmation.addProfile("Professor Moe T Wynn", "moe-wynn.png",
`
Prof. Wynn leads the Process Science Academic Program (formerly Business Process 
Management) and is the Academic Lead of Research for the School of Information 
Systems, Queensland University of Technology. She co-leads the Data for 
Discovery Program within QUT’s Centre for Data Science. She has been appointed 
as a member of the Australian Research Council College of Experts for the 
period of 3 years (2023 – 2025).
She conducts research in the areas of business process management, workflow 
management, process mining and data quality, having completed her PhD in 
workflow management, and process automation. She is recognised internationally 
for her contributions to the formal foundations of process modelling, 
verification, automation, and process-oriented data mining (process mining).
`,
"R"
)
PhDConfirmation.addTextSection(
`
The candidate needs to prepare a working research plan in the form of a report. 
The report should describe the current progress, such as initial investigations, 
work-in-progress papers, and publications. Also, the report must present a 
research plan for the coming two years that is likely to be completed in a 
timely manner, i.e., it should be realistically possible for a candidate to 
complete it in the remaining time left in their candidature. The panel's role 
is to assess the candidate's plan and progress towards a doctorate. QUT 
outlines the outcomes of the confirmation, as it was within my candidature, 
as:
`
)
PhDConfirmation.addQuote(
`
The panel assess the candidates capacity to complete the degree successfully 
in a timely fashion and agree on a confirmation outcome. The panel chair 
recommends the confirmation outcome to the Research Degrees Committee (RDC) 
using the confirmation panel report form. After considering the panel's report 
and recommendation, the RDC will either:<br>
<ul style="text-align: left;width:80%;margin:auto;">
    <li>confirm the candidature if certain conditions are met;</li>
    <li>require changes to the planned research program;</li>
    <li>place the candidate under review for up to 3 months if the panel 
    recommends not confirming the candidature.</li>
</ul>
If the candidates progress is still unsatisfactory after the under review 
period, the RDC - on advice from the faculty - will either:<br>
<ul style="text-align: left;width:80%;margin:auto;">
    <li>extend the review period by up to 3 months;</li>
    <li>allow the candidate to Show Cause why the committee should not 
    either:</li>
    <ul style="margin-left:10px">
        <li>academically exclude you with an offer of admission to the 
        Master of Philosophy course;</li>
        <li>academically exclude you from the PhD course with no such 
        offer.</li>
    </ul>
</ul>
`,
"Queensland University of Technology, 2024"
)
PhDConfirmation.addTextSection(
`
While the outcomes seem extreme, most candidates will receive minor/major 
changes, often seen as the ideal outcome from confirmation. The more extreme 
cases occur only in very rare cases, showcasing the wonderful supervisors and 
their experienced mentorship at my school, Information Systems. 
<b>
However, in my case, the presentation and report were enough evidence for the 
panel to recommend one of the rare cases, no changes needed! 
</b>
Reflecting on this moment, it was between Prof. Sander Leemans leaving QUT 
and preparing a submission for a Q1 venue, so I am glad that I could achieve 
this outcome. However, after the supervision team change, Prof. Sander Leemans 
moved from lead to external, which meant I had to change the research plan I 
would follow for the rest of the candidature. This change was not unexpected, 
academic endeavours are like a discussion, and I was only starting the 
conversion at this stage.
`
)
PhDConfirmation.addTextSection(
`
Below are the documents I used for my confirmation back in 2022, with all the 
blemishes and mistakes. Please do not hold my current self to the quality of 
these documents. I hope that others at QUT may find some inspiration from 
these documents if they are searching.
`
)
PhDConfirmation.addPdfSection(
"2024/Adam_Banham___PhD___Confirmation_of_Candidature.pdf",
"Adam Banham, 2022, Confirmation of Candidature Report"
)
PhDConfirmation.addPdfSection(
"2024/Adam_Banham_PhD_confirmation_presentation.pdf",
"Adam Banham, 2022, Confirmation of Candidature Seminar Presentation"
)

export default PhDConfirmation