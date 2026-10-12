import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const questions = [
  { question: "How does Wasla tailor my CV for each job?", answer: "It uses your career profile and verified experience to emphasize what is relevant to that role. You can review and edit the tailored CV in the Application Pack." },
  { question: "Does Wasla submit applications automatically?", answer: "The current submission mode is official employer handoff. Wasla prepares and freezes your materials; you complete the employer form. External submission automation requires an authorized integration." },
  { question: "Can Wasla submit without my approval?", answer: "You explicitly approve each pack. The current platform does not send applications automatically; user-reported completion is recorded separately from a verified employer receipt." },
  { question: "What if Wasla does not know an answer?", answer: "The question is marked as needing information. Wasla asks you to provide it before the application moves forward." },
  { question: "Can I pause Autopilot?", answer: "Your campaign goal, packs, and application history stay saved. The current workflow analyzes opportunities on demand; opening your profile does not resume background work." },
  { question: "What if an employer site cannot be automated?", answer: "Wasla prepares the pack and guides the final step on the employer site. You can confirm submission afterward so tracking remains current." },
  { question: "Can I review what Wasla prepares?", answer: "Yes. Each Application Pack shows the tailored CV, letter, answers, requirements, evidence, readiness, and submission method." },
  { question: "Does Wasla invent experience or skills?", answer: "No. Wasla draws from the career profile and evidence you provide. Missing proof is surfaced for your review." },
  { question: "How can I see what Wasla has done?", answer: "The Command Center, Autopilot trace, and Applications pipeline show decisions, preparation, approvals, submissions, and follow-ups." },
  { question: "How does Wasla use my career information?", answer: "It supports role matching, evidence checks, and tailored Application Packs. You choose what is included before submitting an application." },
];

export function FaqSection() {
  return <section className="ws-faq-section" id="faq"><div className="ws-marketing-container ws-faq-grid">
    <div><span className="ws-feature-index">QUESTIONS, ANSWERED</span><h2>Know what your agent will do.</h2><p>Control, accuracy, and visibility matter when applications go out under your name.</p></div>
    <div className="ws-faq-list"><Accordion type="single" collapsible>{questions.map((item,index) =>
      <AccordionItem key={item.question} value={"faq-" + index}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent>{item.answer}</AccordionContent></AccordionItem>
    )}</Accordion></div>
  </div></section>;
}
