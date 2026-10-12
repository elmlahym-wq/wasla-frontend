/** Marketing display data only. This file does not configure billing or payments. */
export const freeAllowance = { signup: 10, monthly: 5 } as const;
export const creditPolicy = { oneTimeExpiry: "أرصدة الدفعة الواحدة لا تنتهي." } as const;
export const creditCosts = [
 { id: "match", name: "تحليل المطابقة المتعمّق", credits: 2, note: "" },
 { id: "pack", name: "حزمة التقديم", credits: 6, note: "" },
 { id: "execution", name: "تنفيذ التقديم التلقائي", credits: 4, note: "على القنوات المدعومة" },
] as const;
export const plans = [
 { id: "free", name: "مجاني", price: 0, credits: freeAllowance.signup, unit: "عند التسجيل", period: "دون رسوم", kind: "ابدأ بملفك وفرصك.", badge: "", highlighted: false },
 { id: "starter", name: "باقة انطلاقة", price: 6, credits: 40, unit: "رصيد وصلة", period: "دفعة واحدة", kind: "رصيد لخطوتك الأولى.", badge: "", highlighted: false },
 { id: "professional", name: "باقة المحترفين", price: 15, credits: 120, unit: "رصيد وصلة", period: "دفعة واحدة", kind: "مساحة أوسع للبحث.", badge: "الخيار المقترح", highlighted: true },
 { id: "campaign", name: "باقة الحملة الكاملة", price: 29, credits: 300, unit: "رصيد وصلة", period: "دفعة واحدة", kind: "رصيد لحملة بحث أوسع.", badge: "", highlighted: false },
 { id: "active", name: "خطة البحث النشط", price: 24, credits: 100, unit: "رصيد كل شهر", period: "شهريًا", kind: "خطة ترافق بحثك شهريًا.", badge: "شهريًا", highlighted: false },
] as const;
export function planNote(plan: (typeof plans)[number]): string {
 if (plan.id === "free") return `${freeAllowance.signup} أرصدة عند التسجيل، ثم ${freeAllowance.monthly} أرصدة كل شهر.`;
 if (plan.id === "active") return `${plan.credits} رصيد شهريًا. Autopilot قريبًا؛ وصول مبكر عند إتاحته.`;
 return creditPolicy.oneTimeExpiry;
}
