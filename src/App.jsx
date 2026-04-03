import { useState, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060c06;--s:#0d160d;--s2:#141f14;
  --gold:#C9A84C;--gd:rgba(201,168,76,.14);
  --g1:#1B5E20;--g2:#2E7D32;--g3:#4CAF50;
  --tr:#6B4423;--br:#8B5E33;
  --t:#EDE8D6;--d:#8A9080;--m:#4A5A4A;
  --bd:rgba(120,160,100,.1);--bd2:rgba(120,160,100,.26);
}
.app{min-height:100vh;background:var(--bg);color:var(--t);font-family:'DM Sans',sans-serif;display:flex;justify-content:center;overflow-x:hidden}
.scr{width:100%;max-width:460px;min-height:100vh;display:flex;flex-direction:column}

.ps{padding:52px 20px 36px}
.ey{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--m);text-align:center;margin-bottom:10px}
.ps-h{font-family:'Cormorant Garamond',serif;font-size:31px;font-weight:300;line-height:1.35;text-align:center;margin-bottom:36px}
.ps-h em{font-style:italic;color:var(--gold)}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;flex:1}
.pc{background:var(--s);border:1px solid var(--bd);border-radius:14px;padding:18px 14px 20px;cursor:pointer;transition:border-color .2s,transform .2s,box-shadow .2s;display:flex;flex-direction:column;gap:8px;user-select:none;position:relative;overflow:hidden}
.pc:hover{border-color:var(--bd2);transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.5)}
.pc:active{transform:scale(.97)}
.pcat{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--g3);font-weight:500}
.pq{font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;line-height:1.45}

.ls{padding:44px 24px 32px}
.bk{display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;background:none;border:none;color:var(--m);padding:0;margin-bottom:28px;transition:color .2s;font-family:'DM Sans',sans-serif}
.bk:hover{color:var(--d)}
.ltopic{font-family:'Cormorant Garamond',serif;font-size:25px;font-style:italic;line-height:1.35;margin-bottom:28px}
.lbody{flex:1;overflow-y:auto;font-size:15px;line-height:1.82;color:var(--d)}
.lbody p{margin-bottom:18px}
.lbody p:first-child{font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;line-height:1.65;color:var(--t)}
.lfoot{margin-top:28px;padding-top:20px;border-top:1px solid var(--bd)}
.lbtn{width:100%;padding:15px;background:transparent;border:1px solid var(--gold);border-radius:10px;color:var(--gold);font-size:13px;letter-spacing:.06em;cursor:pointer;transition:all .3s;font-family:'DM Sans',sans-serif}
.lbtn:hover:not(:disabled){background:var(--gd);box-shadow:0 0 18px rgba(201,168,76,.18)}
.lbtn:disabled{opacity:.35;cursor:not-allowed}

.sp{align-items:center;justify-content:center;padding:48px 32px}
.sp-txt{font-family:'Cormorant Garamond',serif;font-size:20px;font-style:italic;font-weight:300;color:var(--d);margin-top:44px;text-align:center;opacity:0;animation:fIn 1s ease 2.8s forwards}
@keyframes fIn{to{opacity:1}}

.ts{padding:36px 20px 28px}
.ts-hd{text-align:center;margin-bottom:4px}
.ts-ti{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;margin-top:8px}
.tsv{flex:1;display:flex;align-items:center;justify-content:center}
.tsf{text-align:center;padding-top:12px}
.gbtn{padding:13px 30px;background:transparent;border:1px solid var(--g2);border-radius:40px;color:var(--g3);font-size:13px;letter-spacing:.05em;cursor:pointer;transition:all .3s;font-family:'DM Sans',sans-serif}
.gbtn:hover{background:rgba(46,110,46,.12);border-color:var(--g3);box-shadow:0 0 16px rgba(76,175,80,.13)}
.tcnt{font-size:11px;color:var(--m);margin-top:10px;letter-spacing:.05em}
.prev-btn{display:block;margin:12px auto 0;background:none;border:none;color:var(--d);font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif;letter-spacing:.04em;transition:color .2s}
.prev-btn:hover{color:var(--t)}

.tlist{display:flex;flex-direction:column;gap:6px;padding:0 4px;margin-bottom:16px;max-height:140px;overflow-y:auto}
.tlist-item{display:flex;align-items:baseline;gap:10px;background:none;border:1px solid transparent;border-radius:8px;padding:8px 12px;cursor:pointer;text-align:left;font-family:'DM Sans',sans-serif;transition:border-color .2s,background .2s;color:var(--t)}
.tlist-item:hover{border-color:var(--bd2);background:var(--s)}
.tlist-cat{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--g3);font-weight:500;flex-shrink:0}
.tlist-q{font-family:'Cormorant Garamond',serif;font-size:14px;font-style:italic;color:var(--d);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

@keyframes drawLine{to{stroke-dashoffset:0}}
@keyframes leafPop{
  0%{opacity:0;transform:scale(0) rotate(-20deg)}
  65%{opacity:1;transform:scale(1.15) rotate(5deg)}
  100%{opacity:1;transform:scale(1)}
}
@keyframes seedPulse{
  0%,100%{opacity:.7}50%{opacity:1}
}
@keyframes nodeIn{
  from{opacity:0;transform:scale(.3)}
  to{opacity:1;transform:scale(1)}
}
@keyframes fruitPop{
  0%{opacity:0;transform:scale(0)}
  70%{opacity:1;transform:scale(1.3)}
  85%{transform:scale(.9)}
  100%{opacity:1;transform:scale(1)}
}
@keyframes birdLand{
  0%{opacity:0;transform:translate(40px,-30px) scale(.5)}
  60%{opacity:1;transform:translate(-3px,2px) scale(1.05)}
  100%{opacity:1;transform:translate(0,0) scale(1)}
}
@keyframes flutter{
  0%,100%{transform:scaleX(1)}
  50%{transform:scaleX(.3)}
}
@keyframes squirrelPeek{
  0%{opacity:0;transform:translateY(10px)}
  100%{opacity:1;transform:translateY(0)}
}
@keyframes forestZoom{
  0%{transform:scale(1);opacity:1}
  100%{transform:scale(.55) translateY(30px);opacity:1}
}
@keyframes treesFadeIn{
  0%{opacity:0;transform:scale(.6)}
  100%{opacity:1;transform:scale(1)}
}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-thumb{background:var(--s2);border-radius:3px}
`;

const POOL = [
  {q:"Why does music make you emotional?",cat:"Neuroscience"},
  {q:"How did Rome actually fall?",cat:"History"},
  {q:"What is really happening inside a black hole?",cat:"Astrophysics"},
  {q:"How does money actually get created?",cat:"Economics"},
  {q:"Why do some people never feel anxious?",cat:"Psychology"},
  {q:"What sparked the Renaissance?",cat:"History"},
  {q:"How do vaccines teach your immune system?",cat:"Biology"},
  {q:"Why do we dream?",cat:"Neuroscience"},
  {q:"How did human language begin?",cat:"Linguistics"},
  {q:"What really caused World War I?",cat:"History"},
  {q:"How do animals navigate without maps?",cat:"Biology"},
  {q:"What is consciousness, actually?",cat:"Philosophy"},
  {q:"How does gravity bend time?",cat:"Physics"},
  {q:"Why did the dinosaurs really go extinct?",cat:"Paleontology"},
  {q:"How do trees communicate underground?",cat:"Biology"},
  {q:"Why does time seem to speed up as you age?",cat:"Psychology"},
  {q:"What is dark matter, actually?",cat:"Astrophysics"},
  {q:"How did writing get invented?",cat:"Anthropology"},
  {q:"Why can hot water freeze faster than cold?",cat:"Chemistry"},
  {q:"What happens when you remove a predator?",cat:"Ecology"},
  {q:"Why is infinity bigger than infinity?",cat:"Mathematics"},
  {q:"Why do placebos work even when you know?",cat:"Medicine"},
  {q:"How far do continents move in your lifetime?",cat:"Geology"},
  {q:"How does quantum entanglement actually work?",cat:"Physics"},
];

const BR = [
  {sx:180,sy:295,qx:148,qy:278,ex:116,ey:252},
  {sx:180,sy:295,qx:212,qy:278,ex:244,ey:252},
  {sx:116,sy:252,qx:92,qy:232,ex:74,ey:208},
  {sx:116,sy:252,qx:124,qy:226,ex:148,ey:202},
  {sx:244,sy:252,qx:236,qy:226,ex:212,ey:202},
  {sx:244,sy:252,qx:266,qy:232,ex:286,ey:208},
  {sx:74,sy:208,qx:56,qy:180,ex:44,ey:152},
  {sx:148,sy:202,qx:144,qy:172,ex:140,ey:142},
  {sx:212,sy:202,qx:216,qy:172,ex:220,ey:142},
  {sx:286,sy:208,qx:304,qy:180,ex:316,ey:152},
];

const FRUITS = [
  {bIdx:0,ox:-6,oy:8,color:"#E53935",r:5},
  {bIdx:1,ox:5,oy:9,color:"#FF9800",r:4.5},
  {bIdx:2,ox:-8,oy:4,color:"#FDD835",r:5},
  {bIdx:3,ox:6,oy:6,color:"#E53935",r:4},
  {bIdx:4,ox:-5,oy:7,color:"#FF9800",r:5},
  {bIdx:5,ox:7,oy:3,color:"#FDD835",r:4.5},
  {bIdx:6,ox:-4,oy:8,color:"#E53935",r:4},
];

const LESSONS = {
  "Why does music make you emotional?": `Right now, somewhere in your brain, there is a pattern-prediction engine so sophisticated that it can make you cry over nothing more than vibrating air. When a melody rises and then delays its resolution by just a beat, your auditory cortex fires a prediction error — and your limbic system floods you with feeling. You are, quite literally, moved by surprise.

Here is the counterintuitive part: music does not express emotion so much as it hijacks the machinery your brain built for something else entirely. The chills you feel during a crescendo use the same dopamine pathway that fires when you eat or fall in love. Your brain cannot tell the difference between a beautiful chord change and a survival reward. Evolution handed composers the keys to your neurochemistry, and they did not even have to ask.

In 1995, the neuroscientist Jaak Panksepp played minor-key music to baby chicks — animals with no cultural relationship to human sadness — and they huddled together and cried out, just as they would when separated from their mother. The emotional circuitry that music exploits is not learned. It is ancient, shared across species, wired so deep that a three-day-old chick responds to the same intervals that make you tear up in a movie theater.

The next time a song catches you off guard in the grocery store and your eyes sting for no reason, know this: you are not being sentimental. You are experiencing one of the oldest feedback loops in the vertebrate brain, a system so fundamental that it predates language, culture, and possibly even consciousness itself. Music does not make you emotional. It reveals that you already were.`,

  "How did Rome actually fall?": `Here is the most dangerous myth in history: that Rome fell in a single dramatic catastrophe, barbarians pouring over the walls while an emperor fiddled. The truth is far stranger and more unsettling. Rome did not collapse — it decomposed. And most of the people living through it had no idea it was happening.

The Western Empire's decline was not caused by any single invasion or moral failing. It was a systems problem. Tax revenues shrank as farmland was abandoned. The army, increasingly staffed by the same Germanic peoples it was meant to repel, lost institutional coherence. Provincial elites stopped identifying with Rome and started cutting local deals. The machine did not break — its parts simply stopped cooperating, one contract at a time.

Consider the year 476, the date every textbook gives for "the fall." The Germanic general Odoacer deposed the last Western emperor, a teenager named Romulus Augustulus. But here is the remarkable thing: almost nobody noticed. No battles raged. No cities burned. Odoacer simply sent the imperial regalia to Constantinople and said the West no longer needed its own emperor. The Roman Senate kept meeting. The aqueducts kept running. People went to the baths the next morning as they always had. The apocalypse arrived as paperwork.

What Rome teaches us is that civilizations rarely end with a bang. They end with a long, slow forgetting — the moment when maintaining the roads becomes someone else's problem, when the shared story that held millions together quietly stops being retold. The fall of Rome is not ancient history. It is a user manual for how complex societies unravel, and it reads uncomfortably like a morning newspaper.`,

  "What is really happening inside a black hole?": `Imagine compressing the entire Earth into a space the size of a marble. That marble would become a black hole — and at its center, everything we think we understand about reality simply stops working. The laws of physics do not break gently. They shatter.

Most people picture a black hole as a cosmic drain, pulling everything inward. But here is what is actually strange: the problem is not gravity — it is time. Once you cross the event horizon, the roles of space and time swap. Falling toward the center is no longer a movement through space. It becomes a movement through time, as inevitable and irreversible as next Tuesday. You cannot avoid the singularity for the same reason you cannot avoid tomorrow.

In 2019, the Event Horizon Telescope produced humanity's first image of a black hole — the supermassive giant at the center of galaxy M87, forty million billion kilometers away. What the image actually shows is not the hole itself but its shadow: a ring of superheated gas spiraling inward at nearly the speed of light, photons bent so violently that we are literally seeing the back of the object from the front. The image took two years of computation from data collected by eight telescopes spanning the globe, all synchronized by atomic clocks. We photographed the unseeable.

Here is the deepest mystery: at the singularity, general relativity predicts infinite density, but quantum mechanics forbids it. Two of our most successful theories of nature flatly contradict each other at this one point. Whatever is really happening inside a black hole is something human physics has not yet invented the language to describe. The universe keeps its deepest secrets behind a horizon we can never cross and return from.`,

  "How does money actually get created?": `Most people believe that a government somewhere prints money and distributes it into the economy. That is wrong in a way that, once you see it, changes how you understand almost everything about modern life. The vast majority of money in circulation was not created by any government. It was created by commercial banks, in the act of making loans.

When a bank approves your mortgage, it does not reach into a vault and hand you someone else's savings. It simply types a number into your account. That number did not exist before. The bank created it — new money, conjured from a ledger entry and a promise. This is not a conspiracy theory; it is the explicit position of the Bank of England, the Federal Reserve, and every central bank on Earth. Roughly 97 percent of all money in modern economies was created this way: not printed, but lent into existence.

In 1694, the Bank of England was founded with exactly this trick. King William III needed money to fight France, so a group of wealthy merchants pooled 1.2 million pounds and lent it to the Crown — but rather than handing over gold, they simply issued banknotes against the debt. The money supply doubled overnight without a single new coin being minted. The merchants earned interest on money they had effectively invented. This was not a scandal. It was the founding act of modern banking, and every economy on the planet still runs on the same principle.

The next time someone asks where money comes from, the honest answer is: from debt. Every dollar, pound, and euro is someone's promise to repay. We do not trade in value — we trade in trust. And the entire global economy is balanced on the remarkable, fragile agreement that tomorrow, that trust will still hold.`,

  "Why do some people never feel anxious?": `You have probably met someone who seems constitutionally incapable of worry — calm in a crisis, unbothered by deadlines, sleeping soundly the night before a presentation that would keep you staring at the ceiling. You might envy them. You probably should not.

The surprising truth is that zero anxiety is not a sign of resilience. It is often a sign that something is missing. Anxiety, at its core, is a prediction system — your brain simulating future threats and preparing you to handle them. People who genuinely experience no anxiety often have reduced activity in the anterior cingulate cortex, the region that monitors for errors and conflict. They are not brave. They are simply not receiving the signal. And research consistently shows they make worse decisions, take reckless risks, and fail to learn from mistakes.

In the 1990s, the neuroscientist Antonio Damasio studied a patient known as S.M., a woman whose amygdalae — the brain's fear centers — had been destroyed by a rare genetic condition. She was fearless in the clinical sense: she could handle snakes without flinching, walked through haunted houses laughing, and once calmly talked down a man who held a knife to her throat. But her life was marked by catastrophically poor judgment. She was exploited repeatedly, walked into dangerous situations without hesitation, and could not learn to avoid threats. Her fearlessness was not a superpower. It was a disability.

The people you admire for their calm are almost never anxiety-free. They are anxiety-skilled — they feel the signal and have learned to metabolize it rather than be paralyzed by it. The goal was never to silence the alarm. It was to build a better relationship with it.`,

  "What sparked the Renaissance?": `The Renaissance did not begin with a painter picking up a brush or a philosopher opening a book. It began with a catastrophe so total that it cracked open the entire medieval worldview: the Black Death, which between 1347 and 1351 killed roughly half the population of Europe.

This seems backward — how does mass death produce a cultural golden age? The answer is economics. When half the laborers die, the survivors suddenly have leverage. Wages doubled. Serfs walked off manors and demanded payment. Guilds could not fill their ranks. For the first time in centuries, ordinary people had disposable income and bargaining power. The rigid feudal hierarchy, which the Church had insisted was God's natural order, was visibly, undeniably broken. If God's plan included killing half of Christendom, perhaps God's plan was worth questioning.

Florence became the epicenter for a specific reason: banking. The Medici family, who made their fortune in finance, began pouring money into art and scholarship — not from pure generosity, but because the Church considered lending at interest a mortal sin. Patronage was laundering for the soul. Cosimo de' Medici once told an associate that he had commissioned Fra Angelico's frescoes specifically to offset his accounts with God. The greatest artworks of the Renaissance were, in a very real sense, receipts for guilt.

What the Renaissance truly was, beneath the marble and the oil paint, was the first time European civilization collectively decided that human beings — not divine authority — were the measure of all things. That idea, born in plague and paid for with interest, is the operating system we are still running today.`,

  "How do vaccines teach your immune system?": `Your immune system is, without exaggeration, the most sophisticated learning machine in your body. It maintains a library of every pathogen it has ever encountered, can manufacture targeted weapons against threats it has never seen before, and does all of this without any conscious input from you. A vaccine is nothing more than a cheat sheet slipped into that library before the exam.

The common misconception is that vaccines work by giving you a mild version of a disease. That is an oversimplification that misses the elegant core of what is actually happening. A vaccine presents your immune system with a piece of a pathogen — a protein, a dead fragment, or in the case of mRNA vaccines, a blueprint for your own cells to build that fragment. Your body mounts a full immune response against this harmless decoy: B cells produce antibodies, T cells learn to kill infected cells, and crucially, memory cells are created and stored. When the real pathogen arrives months or years later, your body does not start from scratch. It has already rehearsed the war.

In 1796, Edward Jenner noticed that milkmaids who had contracted cowpox — a mild disease — never caught smallpox. He took pus from a cowpox sore on a milkmaid's hand and scratched it into the arm of an eight-year-old boy named James Phipps. Six weeks later, he deliberately exposed the boy to smallpox. Nothing happened. Jenner had no idea why it worked — germ theory would not exist for another seventy years — but he had stumbled onto the principle that would eventually eradicate the deadliest disease in human history, a disease that killed roughly 500 million people in the twentieth century alone.

What remains astonishing is the speed. Your adaptive immune system can generate roughly ten billion different antibody configurations — enough to recognize virtually any molecular shape in the universe, including pathogens that do not yet exist. You are walking around with a defense system pre-loaded against threats that evolution has not even invented yet.`,

  "Why do we dream?": `Every night, you lose your mind. Your prefrontal cortex — the seat of logic, planning, and self-control — goes largely offline, and your brain begins generating vivid hallucinations that you accept without question. You fly, you fall, your teeth crumble, your dead grandmother serves you tea. And until the alarm rings, none of it strikes you as strange. This is dreaming, and after a century of neuroscience, we still do not fully understand why it happens.

The leading theory is not that dreams mean something — it is that they do something. During REM sleep, your brain replays and recombines the day's experiences, stripping them of their emotional charge and filing them into long-term memory. Dreams may be the felt experience of your brain doing maintenance: defragmenting the hard drive while you watch the screensaver. The bizarre imagery is not symbolic. It is your neural networks firing in semi-random patterns as connections are pruned and strengthened.

In 2010, researchers at Harvard had subjects navigate a complex 3D maze, then let half of them nap. Those who dreamed about the maze performed ten times better on their next attempt than those who napped dreamlessly — and enormously better than those who stayed awake and actively practiced. The dreamers were not just resting. Their sleeping brains were solving the problem, running simulations, finding shortcuts that waking cognition had missed. One subject reported dreaming of the maze with people standing at key decision points, like living signposts planted by her unconscious.

Perhaps the strangest implication is this: you spend roughly six years of your life dreaming — two hours every night, in a state of consciousness so foreign that you cannot reliably remember it. Your brain considers this process so essential that it will sacrifice sleep quality to preserve it. Whatever dreams are doing, your mind has decided it cannot survive without them.`,

  "How did human language begin?": `No one alive has ever witnessed the birth of a language — not a pidgin, not a creole, but a true first language emerging where none existed before. It has happened exactly once in recorded observation, and it happened in a schoolyard in Nicaragua in the 1980s.

The prevailing theory about language origins is that it did not evolve for communication at all. It evolved for thought. Before language, our ancestors could perceive the world but could not recursively think about their perceptions — could not hold an idea in mind, modify it, and pass it to someone else's mind in modified form. Language gave humans the ability to run mental simulations: "If I go there, and he goes there, then tomorrow we could..." No other species does this. It is not that animals lack the words. They lack the recursive architecture that words require.

In 1980, Nicaragua's new Sandinista government gathered hundreds of deaf children into schools for the first time. These children had never been exposed to any formal sign language. Within a single generation, they spontaneously created one — Idioma de Signos Nicaragüense — complete with grammar, syntax, and recursive embedding. The younger children, crucially, produced a more complex and grammatically consistent language than the older ones, suggesting that the ability to generate linguistic structure is not learned but innate, a biological capacity that simply needs other minds to activate.

Language may be the most consequential accident in evolutionary history. A brain that can hold a symbol — "tomorrow," "justice," "if" — can cooperate with strangers, plan across seasons, teach what it learned to children who teach their children. Every human institution, from law to literature, is downstream of the moment some ancestor first pointed at something that was not there.`,

  "What really caused World War I?": `Here is a fact that should unsettle you: in June 1914, most of Europe's leaders did not want a war. The emperors, prime ministers, and generals who would send ten million men to their deaths over the next four years stumbled into catastrophe through a chain of miscalculations so spectacularly stupid that historians are still arguing about who to blame — because the honest answer might be no one and everyone.

The assassination of Archduke Franz Ferdinand was not the cause. It was the match. The powder keg was a system of interlocking alliances and mobilization timetables so rigid that once one domino tipped, no human being had the power to stop the rest. Austria wanted to punish Serbia. Russia mobilized to defend Serbia. Germany's war plan — the Schlieffen Plan — required attacking France before Russia could fully mobilize, which meant invading Belgium, which brought in Britain. Every country entered the war to prevent the war from being worse. Every country was wrong.

The German mobilization plan is the most haunting detail. Kaiser Wilhelm, in a moment of panic, asked his chief of staff Helmuth von Moltke whether the army could mobilize against Russia alone, without attacking France. Moltke reportedly turned pale and said it was impossible — the railway timetables had been set for a two-front war and could not be changed. The entire Western Front, with its trenches and gas and slaughter, may have happened because of train schedules. The machinery of war had become so complex that the humans nominally in charge of it could no longer steer it.

World War I is not really a story about nationalism or imperialism, though both were present. It is a story about what happens when systems become so tightly coupled that small shocks produce catastrophic failures — when the cost of coordination becomes indistinguishable from the cost of collapse. It is, in other words, a systems engineering problem. And it has never been more relevant than right now.`,

  "How do animals navigate without maps?": `Every autumn, the Arctic tern completes a migration from pole to pole — roughly 44,000 miles — and arrives at its destination within a few hundred feet of where it nested the year before. It does this without GPS, without landmarks over open ocean, and with a brain smaller than a walnut. The question is not how it navigates. The question is how we ever thought we were the clever species.

The answer, it turns out, is that animals navigate using senses we do not have and can barely detect with instruments. Many migratory birds perceive Earth's magnetic field directly — not as a number on a compass, but as a visual overlay on their world. A protein called cryptochrome in their retinas reacts to magnetic field lines, meaning they may literally see magnetism as a pattern of light and shadow superimposed on the landscape. They are navigating with a sense as vivid to them as color is to you, and we had no idea it existed until the 2000s.

In one of the most elegant experiments in biology, researchers in the 1950s placed starlings in a planetarium and shifted the projected star patterns. The birds adjusted their orientation to match the fake sky. Then they fitted pigeons with tiny magnets glued to their heads, disrupting their magnetic sense. On cloudy days, the pigeons got lost. On clear days, they navigated by the sun instead. The animals were not relying on one system. They were cross-referencing multiple navigation systems — magnetic, solar, stellar, even olfactory — with a redundancy that would impress an aerospace engineer.

We built GPS satellites and congratulated ourselves on solving navigation. Meanwhile, a bar-tailed godwit flew 7,000 miles nonstop from Alaska to New Zealand — the longest recorded non-stop flight of any bird — without eating, sleeping, or making a single course correction it could not have made a million years ago.`,

  "What is consciousness, actually?": `You are reading these words, and you know that you are reading them. That self-awareness — the fact that there is something it is like to be you right now — is the single hardest problem in all of science. We can explain how neurons fire, how memories form, how light becomes vision. What we cannot explain is why any of that processing feels like anything at all.

The deepest puzzle is known as the "hard problem," named by philosopher David Chalmers in 1995. You can build a robot that detects red light, processes it, and says "that is red." But there is no reason, in principle, why that processing should produce the subjective experience of redness — the warm, vivid quale that fills your mind when you look at a sunset. Everything the brain does could theoretically happen "in the dark," with no inner experience whatsoever. The fact that consciousness exists at all is, from a purely physical standpoint, inexplicable. We do not even have a theory for why it should be there.

The most unsettling experiment in consciousness research was conducted by Benjamin Libet in 1983. He asked subjects to flick their wrist whenever they felt like it while monitoring their brain activity. The startling result: the brain's motor cortex began firing a full half-second before the subjects reported feeling the urge to move. The conscious decision to act came after the brain had already decided. If replicated — and it has been, many times — this suggests that consciousness may not be the author of your actions but the narrator, constructing a story of agency after the fact.

We are the only species that asks what consciousness is, and that question may itself be consciousness doing the only thing it knows how to do: turning its gaze inward and finding, at the bottom, a mystery it cannot resolve because it is the mystery. The flashlight cannot illuminate itself.`,

  "How does gravity bend time?": `If you live on the top floor of a tall building, you age faster than your neighbor in the lobby. Not metaphorically. Not perceptually. Your clocks tick faster, your atoms vibrate faster, and over a lifetime, you will have aged a few microseconds more than the person downstairs. This is not science fiction. It is general relativity, confirmed to thirteen decimal places, and your phone relies on it every time it calculates your position.

Einstein's insight was deceptively simple and profoundly strange: gravity is not a force pulling you down. It is a curvature in the fabric of spacetime itself. Mass bends spacetime the way a bowling ball dimples a rubber sheet, and objects moving through that curved spacetime follow the straightest possible path — which, from our perspective, looks like falling. Time passes more slowly in stronger gravitational fields because time itself is being stretched. Closer to a massive object, there is literally less time per second.

In 2010, physicists at the National Institute of Standards and Technology demonstrated this with two aluminum ion clocks placed just one foot apart in height. The higher clock ticked faster — by exactly the amount Einstein predicted in 1915. The precision was so extreme that these clocks could detect the gravitational difference caused by raising them the thickness of a few sheets of paper. GPS satellites, orbiting where gravity is weaker, gain about 38 microseconds per day relative to ground clocks. Without relativistic correction, your GPS position would drift by roughly six miles daily.

What makes this profound is not the math. It is the implication. Time is not a universal backdrop against which events happen. It is a local phenomenon, shaped by where you are and how fast you are moving. Your head is aging faster than your feet. The present moment is not a shared experience — it is yours alone, and it has always been.`,

  "Why did the dinosaurs really go extinct?": `Sixty-six million years ago, a rock six miles wide hit the Yucatan Peninsula at 45,000 miles per hour and ended a 165-million-year dynasty in roughly twenty-four hours. That much is familiar. What most people do not realize is how absurdly close it came to not mattering at all.

The asteroid impact was catastrophic, but the killing mechanism was not the impact itself. It was chemistry. The asteroid struck a shelf of limestone and anhydrite — rocks rich in sulfur and carbonate. The impact vaporized these minerals and injected billions of tons of sulfur aerosols into the stratosphere, blocking sunlight for years and dropping global temperatures by as much as 25 degrees Fahrenheit. Had the asteroid hit almost anywhere else — deep ocean, granite, basalt — the dust cloud would have been dramatically smaller, the temperature drop survivable, and dinosaurs might still rule the Earth. The extinction happened not because of the asteroid's size, but because of where it landed.

In 2017, a team of geologists drilled into the Chicxulub crater and pulled up cores from the impact site. What they found was extraordinary: the rock layer deposited in the hours after impact contained charcoal from global wildfires, shocked quartz from vaporized bedrock, and iridium — an element rare on Earth but common in asteroids — in concentrations thousands of times above normal. Below this line: a world of dinosaurs. Above it: nothing larger than a cat for the next three million years. The boundary is so sharp you can touch it with your finger.

The most humbling detail is the timing. Dinosaurs were not in decline. They were thriving, diversifying, conquering every ecological niche on the planet. They did not fail. They were simply standing in the wrong place when the universe rolled the dice. Every mammal alive today, including you, exists because of a geological accident measured in degrees of longitude.`,

  "How do trees communicate underground?": `Beneath every forest is a second forest — a labyrinth of fungal threads so vast and interconnected that a single network can span an entire mountainside. These threads, thinner than a human hair, weave through the soil and physically plug into the roots of trees, forming a biological internet that ecologists now call the Wood Wide Web. And the traffic on this network is staggering.

Trees do not just passively share space with fungi. They actively trade. Through mycorrhizal networks, a tree sends carbon — sugars produced by photosynthesis — into the fungal threads, and in return receives phosphorus and nitrogen that the fungus extracts from soil the roots could never reach alone. But here is where it gets strange: the trading is not bilateral. A single large tree, a so-called "mother tree," can be connected to hundreds of other trees simultaneously, and she preferentially sends more carbon to her own offspring. She recognizes her seedlings and feeds them through the network.

Suzanne Simard, the ecologist who pioneered this research at the University of British Columbia, demonstrated something extraordinary in 1997. She injected radioactive carbon into a birch tree and tracked where it went. The carbon traveled through the fungal network into neighboring Douglas firs — trees of a completely different species — at rates that could not be explained by passive diffusion. The trees were actively sharing resources. When she later shaded the firs to simulate winter, the transfer of carbon from birch to fir increased, as though the birch were compensating for its neighbor's reduced photosynthesis.

A forest is not a collection of individuals competing for light. It is a superorganism, cooperating through a fungal network that predates the evolution of roots themselves. The next time you walk through woods, you are walking on top of a conversation that has been happening, unbroken, for four hundred million years.`,

  "Why does time seem to speed up as you age?": `When you were eight, summer lasted forever. Now you blink and it is October. This is not nostalgia. It is a measurable, near-universal perceptual phenomenon, and the explanation is both simpler and stranger than you might think: your brain is not a clock. It is a novelty detector. And as you age, the world becomes less novel.

The leading theory, proposed by psychologist William James in 1890 and confirmed by modern imaging, is called the "proportional theory" — but that is only half the story. Yes, one year is a smaller fraction of your total life at forty than at four. But the deeper mechanism is about information density. Your brain timestamps memories according to how much new information they contain. A childhood summer full of first experiences — first swim, first crush, first thunderstorm that actually scared you — gets hundreds of timestamps. A commuting adult's Tuesday gets essentially none. When you look back, the richly stamped periods seem long. The barren ones collapse.

Neuroscientist David Eagleman demonstrated this viscerally. He had subjects watch a series of images flashing on a screen — the same image repeated, then suddenly a new one. Subjects consistently reported that the novel image appeared on screen longer than the repeated ones, even though all images were shown for exactly the same duration. Novelty literally stretches perceived time. In a separate study, he dropped people from 150-foot towers into nets while they wore special wristwatch displays. Their brains did not actually speed up during the fall — but retrospectively, the terrifying three-second drop was remembered as lasting much longer than three seconds.

The implication is both alarming and liberating. If you want time to slow down, you do not need meditation or mindfulness apps. You need unfamiliarity. New places, new skills, new people. A life of comfortable routine is, perceptually, a short life. The clock is not speeding up. You are just watching the same episode on repeat.`,

  "What is dark matter, actually?": `Look up at the night sky and everything you see — every star, planet, nebula, and galaxy — accounts for roughly five percent of the universe. The other ninety-five percent is invisible, undetectable by any telescope ever built, and we have almost no idea what it is. Welcome to the dark matter problem, the most embarrassing gap in the history of physics.

Dark matter is not dark in the way a cave is dark. It does not absorb or block light. It does not interact with light at all. It passes through ordinary matter like a ghost through a wall. The only reason we know it exists is gravity: galaxies rotate too fast. The visible stars in a galaxy do not have enough mass to generate the gravitational pull needed to hold the galaxy together at its observed rotation speed. Without some additional, invisible mass — about six times more than all visible matter — every galaxy in the universe should have flown apart billions of years ago. Something is there. We just cannot see, touch, or detect it directly.

In the 1970s, astronomer Vera Rubin was measuring the rotation curves of spiral galaxies when she noticed something that should have been impossible. Stars at the outer edges of galaxies were orbiting just as fast as stars near the center. This flatly contradicted Newtonian physics — it was as if the galaxies were embedded in a vast halo of invisible mass. Rubin's work was initially dismissed, partly because she was a woman in a field that barely tolerated women. She was right. Every galaxy measured since has confirmed her finding, and she never received the Nobel Prize.

We have built detectors a mile underground, launched satellites to map its gravitational fingerprints, and smashed particles together at nearly the speed of light trying to create it. Nothing. Dark matter remains the most significant thing in the universe that we know exists but cannot explain. Ninety-five percent of reality is still hiding in plain sight.`,

  "How did writing get invented?": `Writing was not invented to tell stories or record poetry. It was invented to count sheep. The oldest known writing system — Sumerian cuneiform, dating to roughly 3400 BCE — consists almost entirely of accounting records: how many bushels of grain were stored, how many cattle were owed, who paid their taxes. Literature was an afterthought. Bureaucracy came first.

The transition from pre-literate to literate society was not a single leap but a slow crawl through increasingly abstract tokens. Before writing, Mesopotamian merchants used small clay tokens — cones for grain, discs for sheep, cylinders for cattle — sealed inside clay envelopes as receipts. Then someone realized you could press the tokens into the surface of the wet envelope before sealing it, creating a visual record of what was inside. Then someone else realized you no longer needed the tokens at all — just the impressions. Writing began the moment a symbol stopped being a picture of a thing and started being a reference to an idea.

The most revealing artifact is a clay tablet from Uruk, dated around 3100 BCE, which records a transaction involving barley rations for workers. It is not beautiful or profound. It is a payroll stub. But buried in its columns of wedge-shaped marks is something revolutionary: the earliest known use of abstraction, where a single symbol means not "one barley" but the concept of "one." Mathematics and writing were born as twins, in the service of keeping track of who owed what to whom.

Every novel you have read, every law that governs your life, every message you have ever sent exists because five thousand years ago, a Sumerian accountant needed to make sure nobody was skimming grain from the temple storehouse. The entire edifice of human knowledge rests on a foundation of inventory management. Somehow, that makes it more miraculous, not less.`,

  "Why can hot water freeze faster than cold?": `Fill two identical containers — one with boiling water, one with lukewarm — and place them both in a freezer. Common sense insists the cool water will freeze first. Common sense is, under certain conditions, dead wrong. The hot water can beat it. This is the Mpemba effect, and it has been confounding physicists for decades.

The effect is named after Erasto Mpemba, a Tanzanian secondary school student who noticed in 1963 that his hot ice cream mix froze faster than his classmates' cooled mixture. When he asked his physics teacher why, the teacher laughed at him. When he asked a visiting professor, Denis Osborne, the professor had the rare humility to actually test it — and confirmed the boy was right. The proposed explanations are still debated: evaporation reducing the volume of hot water, dissolved gases escaping, convection currents distributing heat differently, or even hydrogen bond dynamics at the molecular level behaving in ways classical thermodynamics does not predict.

What makes the Mpemba effect genuinely unsettling is not that it happens — it is that we cannot fully agree on why. In 2012, the Royal Society of Chemistry held a competition inviting anyone to explain the phenomenon, and received over 22,000 entries. No single explanation satisfied everyone. A process as seemingly simple as water turning to ice — something that happens in every freezer on Earth — still contains a mystery that the combined intellect of modern chemistry has not conclusively solved. The universe hides its puzzles in the most ordinary places.`,

  "What happens when you remove a predator?": `In 1995, fourteen grey wolves were released into Yellowstone National Park after a seventy-year absence. Within a decade, they had changed the course of rivers. That sentence is not a metaphor. The wolves literally altered the physical geography of the park, and the chain of events that made it possible is one of the most stunning demonstrations of ecological interconnection ever documented.

The mechanism is called a trophic cascade. Without wolves, Yellowstone's elk population had exploded and spent decades overgrazing riverbanks. Willows, aspens, and cottonwoods were eaten to stumps. Without root systems to anchor the soil, riverbanks eroded, channels widened, and streams meandered aimlessly. When the wolves returned, they did not just reduce elk numbers — they changed elk behavior. Elk stopped lingering in open valleys where they were vulnerable. Vegetation rebounded in exactly those areas. Within five years, some willow stands grew from less than a foot to over nine feet tall. Songbirds returned. Beavers returned. Beaver dams created pools that cooled water temperatures and sheltered fish. The rivers themselves narrowed and deepened as root networks stabilized their banks.

The deeper lesson is that an ecosystem is not a list of species. It is a web of relationships so tightly woven that removing a single thread can unravel the whole tapestry — and restoring that thread can re-weave it. The wolves did not just hunt elk. They healed a landscape. A predator, it turns out, is not a destroyer. It is a keystone, and the arch collapses without it.`,

  "Why is infinity bigger than infinity?": `Here is a statement that sounds like nonsense: there are more real numbers between zero and one than there are whole numbers in the entire infinite number line. Both sets are infinite. But one infinity is, in a precise mathematical sense, larger than the other. This is not philosophy. It is a proven theorem, and it broke mathematics wide open.

In 1891, Georg Cantor published a proof so elegant it fits on a napkin. It is called the diagonal argument. Suppose you could list every real number between zero and one. Cantor showed that no matter how you arrange the list, you can always construct a new number that differs from every entry — change the first digit of the first number, the second digit of the second number, and so on along the diagonal. This new number is guaranteed not to be on your list. Therefore, the real numbers cannot be listed, which means they are a strictly larger infinity than the countable infinity of whole numbers. Infinity comes in sizes.

The reaction to Cantor's work was ferocious. Leopold Kronecker, one of the most powerful mathematicians alive, called Cantor a "corrupter of youth" and blocked his career at every turn. Henri Poincare called his ideas a "disease." Cantor suffered repeated mental breakdowns and spent his final years in a sanatorium. But he was right. Today, his hierarchy of infinities is the foundation of set theory, which is itself the foundation of all modern mathematics. The man who proved that some infinities are bigger than others paid for the discovery with his sanity — and gave us the framework on which every mathematical truth now rests.`,

  "Why do placebos work even when you know?": `A doctor hands you a pill and says, clearly and honestly, "This contains no active ingredient. It is a placebo." You take it anyway. And your pain decreases. This is not a thought experiment. It is the result of multiple clinical trials, and it violates everything most people think they understand about the placebo effect.

The traditional explanation — that placebos work because patients believe they are receiving real medicine — turns out to be incomplete. In 2010, Ted Kaptchuk at Harvard gave irritable bowel syndrome patients pills in bottles clearly labeled "placebo." He told them the pills were inert. He even explained what the placebo effect was. The patients who took the open-label placebos improved nearly twice as much as those who received no treatment at all. The ritual of taking a pill — the act of swallowing something on a schedule, of being cared for within a medical context — activates real neurochemical pathways. Brain imaging shows that placebos trigger the release of endorphins, dopamine, and endocannabinoids through the same pathways that actual painkillers use. Your brain has a pharmacy, and the prescription is expectation and ritual.

The implications are profound and uncomfortable. If a sugar pill can reduce pain, ease depression, and calm inflammation — not through deception but through the sheer neurology of being treated — then the boundary between "real" medicine and "fake" medicine is far blurrier than the pharmaceutical industry would like. Every drug trial already accounts for this: the real question is never "does this drug work?" but "does it work better than the elaborate fiction of caring?" The placebo is not the control. It is the competition.`,

  "How far do continents move in your lifetime?": `Right now, as you read this, the ground beneath you is moving. North America is drifting away from Europe at roughly the same speed your fingernails grow — about one inch per year. This sounds trivially slow until you do the math: over a single human lifetime, the Atlantic Ocean widens by about six feet. Over the four-billion-year history of the Earth, that creeping pace has rearranged every landmass on the planet, repeatedly.

The engine driving this motion sits beneath your feet: convection currents in the mantle, where rock heated by radioactive decay in the Earth's core rises, spreads, cools, and sinks in a slow roiling cycle. The continents are not floating on liquid — they are embedded in tectonic plates that ride these currents like luggage on a conveyor belt. Roughly every 400 to 600 million years, the continents collect into a single supercontinent, then rift apart again. Pangaea, which most people have heard of, was only the most recent. Before it came Rodinia, about a billion years ago, and before that Nuna, around 1.8 billion years ago. The Earth has been assembling and disassembling its surface like a slow-motion jigsaw puzzle since before multicellular life existed.

Alfred Wegener proposed continental drift in 1912 and was mocked for it. He was a meteorologist, not a geologist, and the establishment dismissed him ruthlessly. He died in 1930 on a Greenland expedition, his theory still rejected. It took another thirty years — and the discovery of seafloor spreading by Harry Hess in the 1960s — for plate tectonics to become accepted science. Wegener was right about nearly everything except the mechanism. The continents do move. The planet is alive. And the map you learned in school is a snapshot of a moment in a dance that has been going on for four billion years and will continue long after the map is dust.`,

  "How does quantum entanglement actually work?": `Take two particles, entangle them, then separate them by any distance — across a room, across a continent, across the universe. Measure one, and you instantly know the state of the other. Not "quickly." Instantly. No signal passes between them. No time elapses. Einstein called this "spooky action at a distance" and spent years arguing it could not possibly be real. He was wrong.

The common misconception is that entanglement allows faster-than-light communication. It does not. What it does is stranger. When two particles are entangled, they exist in a shared quantum state — a single mathematical description that encompasses both particles, regardless of separation. Measuring one does not send a message to the other. Rather, the two particles were never truly separate to begin with. The distance between them, which seems so fundamental to our everyday experience, is irrelevant to their quantum description. Entanglement does not violate relativity. It reveals that our intuition about separateness — the idea that things far apart are independent — is simply not how the universe works at its deepest level.

In 2022, the Nobel Prize in Physics was awarded to Alain Aspect, John Clauser, and Anton Zeilinger for experiments that definitively proved entanglement is real and not explicable by any hidden local variables. Aspect's landmark 1982 experiment was particularly elegant: he switched the measurement settings while the photons were already in flight, closing the loophole that the detectors could somehow be coordinating in advance. The correlations held. Nature does not deal in local realism. Two entangled particles share a connection that transcends space, and no classical explanation — no hidden note tucked inside at the moment of creation — can account for what we observe. The universe is, at its foundation, non-local. Things that are here are also there. And physics has had to make peace with that.`,
};

function shuffle(a){return [...a].sort(()=>Math.random()-.5)}


function PromptsScreen({onSelect,lessons=[],filterCat=null,onBack,skipCounts={}}){
  const completedTopics=new Set(lessons.map(l=>l.topic));
  const [ps]=useState(()=>{
    const available=POOL.filter(p=>!completedTopics.has(p.q));
    if(filterCat){
      return shuffle(available.filter(p=>p.cat===filterCat));
    }
    const fresh=available.filter(p=>(skipCounts[p.q]||0)<5);
    const stale=available.filter(p=>(skipCounts[p.q]||0)>=5);
    return [...shuffle(fresh),...shuffle(stale)].slice(0,6);
  });
  return(
    <div className="scr ps">
      <div className="ey">Your Knowledge Tree</div>
      {filterCat?(
        <div className="ps-h">More in <em>{filterCat}</em></div>
      ):(
        <div className="ps-h">What are you <em>curious</em> about?</div>
      )}
      {filterCat&&<button className="bk" onClick={onBack} style={{padding:"0 20px",marginBottom:12}}>← Back to Tree</button>}
      <div className="pgrid">
        {ps.map((p,i)=>(
          <div key={i} className="pc" onClick={()=>onSelect(p,ps)}>
            <div className="pcat">{p.cat}</div>
            <div className="pq">{p.q}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LessonScreen({prompt,onBack,onComplete,isReview}){
  const fullText=LESSONS[prompt.q]||"Lesson not found.";
  const paragraphs=fullText.split(/\n\n+/).slice(0,3);

  return(
    <div className="scr ls">
      <button className="bk" onClick={onBack}>← Back</button>
      <div className="ltopic">{prompt.q}</div>
      <div className="lbody">
        {paragraphs.map((p,i)=><p key={i}>{p}</p>)}
      </div>
      <div className="lfoot">
        {isReview?(
          <button className="lbtn" onClick={onBack}>
            ← Back to Tree
          </button>
        ):(
          <button className="lbtn" onClick={onComplete}>
            I've got this ✦
          </button>
        )}
      </div>
    </div>
  );
}

function SproutScreen({count,onDone}){
  useEffect(()=>{
    const dur=count>25?5200:4600;
    const t=setTimeout(onDone,dur);
    return()=>clearTimeout(t);
  },[]);

  const branchN=Math.min(count-1,BR.length);
  const existingCount=Math.max(branchN-1,0);
  const newBranch=branchN>0&&count<=11?BR[branchN-1]:null;
  const fruitCount=Math.max(0,Math.min(count-11,FRUITS.length));
  const prevFruitCount=Math.max(0,fruitCount-1);
  const animalCount=Math.max(0,Math.min(count-18,7));
  const prevAnimalCount=Math.max(0,animalCount-1);
  const isForest=count>25;

  const msgs=[
    "Your tree of knowledge has taken root.",
    "Another branch, another world.",
    "Your roots grow deeper.",
    "Knowledge builds on knowledge.",
    "The canopy widens.",
    "A forest begins with a single tree.",
    "Branches reaching for light.",
    "Wisdom takes shape.",
    "Your understanding grows.",
    "A magnificent tree emerges.",
    "First fruits of knowledge appear.",
    "Your wisdom bears fruit.",
    "The harvest of curiosity.",
    "Sweet rewards of learning.",
    "Knowledge ripens on every branch.",
    "Abundance follows patience.",
    "A feast of understanding.",
    "Life finds your tree.",
    "The first visitor arrives.",
    "Your tree draws life to it.",
    "A small world forms.",
    "Knowledge attracts wonder.",
    "An ecosystem of ideas.",
    "The tree teems with life.",
    "Nature recognizes wisdom.",
    "A forest grows from your knowledge.",
    "One tree becomes many.",
    "Your roots spread beyond sight.",
  ];

  if(count===1){
    return(
      <div className="scr sp">
        <svg width="160" height="200" viewBox="0 0 160 200">
          <ellipse cx="80" cy="190" rx="55" ry="7" fill="#0d160d"/>
          <ellipse cx="80" cy="184" rx="10" ry="7" fill="#6B4423" style={{animation:"seedPulse 1.5s ease infinite"}}/>
          <line x1="80" y1="180" x2="80" y2="140" stroke="#5C3D1E" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="40" strokeDashoffset="40"
            style={{animation:"drawLine 1.4s ease .4s forwards"}}/>
          <ellipse cx="72" cy="138" rx="12" ry="7" fill="#2E7D32" opacity="0"
            style={{animation:"leafPop .7s ease 1.8s forwards",transformOrigin:"80px 140px",transform:"rotate(-35deg)"}}/>
          <ellipse cx="88" cy="136" rx="12" ry="7" fill="#388E3C" opacity="0"
            style={{animation:"leafPop .7s ease 2.1s forwards",transformOrigin:"80px 140px",transform:"rotate(35deg)"}}/>
        </svg>
        <div className="sp-txt">{msgs[0]}</div>
      </div>
    );
  }

  const pathLen=(b)=>{
    const dx1=b.qx-b.sx,dy1=b.qy-b.sy,dx2=b.ex-b.qx,dy2=b.ey-b.qy;
    return Math.sqrt(dx1*dx1+dy1*dy1)+Math.sqrt(dx2*dx2+dy2*dy2);
  };

  const renderFullTree=()=>(
    <>
      <ellipse cx="180" cy="360" rx="90" ry="9" fill="#0d160d"/>
      <line x1="180" y1="356" x2="180" y2="290"
        stroke="#6B4423" strokeWidth="7" strokeLinecap="round"/>
      <circle cx="180" cy="290" r="6" fill="#1B5E20" opacity=".75"/>
      {BR.slice(0,Math.min(branchN,BR.length)).map((b,i)=>(
        <g key={i}>
          <path d={`M${b.sx},${b.sy} Q${b.qx},${b.qy} ${b.ex},${b.ey}`}
            stroke="#8B5E33" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <circle cx={b.ex} cy={b.ey} r="21" fill="#1B5E20" opacity=".8"/>
          <circle cx={b.ex-9} cy={b.ey-7} r="14" fill="#2E7D32"/>
          <circle cx={b.ex+8} cy={b.ey-8} r="13" fill="#2E7D32"/>
          <circle cx={b.ex} cy={b.ey-14} r="12" fill="#388E3C"/>
          <circle cx={b.ex+2} cy={b.ey-4} r="7" fill="#4CAF50" opacity=".55"/>
        </g>
      ))}
    </>
  );

  // Fruit stage transition (lessons 12-18)
  if(count>11&&count<=18){
    const newFruit=FRUITS[fruitCount-1];
    const nb=newFruit?BR[newFruit.bIdx]:null;
    return(
      <div className="scr sp">
        <svg width="360" height="370" viewBox="0 0 360 370" style={{overflow:"visible"}}>
          {renderFullTree()}
          {FRUITS.slice(0,prevFruitCount).map((f,i)=>{
            const b=BR[f.bIdx];
            return <circle key={`ef-${i}`} cx={b.ex+f.ox} cy={b.ey+f.oy} r={f.r} fill={f.color} opacity=".9"/>;
          })}
          {newFruit&&nb&&(
            <circle cx={nb.ex+newFruit.ox} cy={nb.ey+newFruit.oy} r={newFruit.r}
              fill={newFruit.color} opacity="0"
              style={{
                animation:"fruitPop .7s ease 1s forwards",
                transformOrigin:`${nb.ex+newFruit.ox}px ${nb.ey+newFruit.oy}px`
              }}/>
          )}
        </svg>
        <div className="sp-txt">{msgs[Math.min(count-1,msgs.length-1)]}</div>
      </div>
    );
  }

  // Animal stage transition (lessons 19-25)
  if(count>18&&count<=25){
    const animalPositions=[
      ()=><Bird x={BR[2].ex-4} y={BR[2].ey-20} flip={false} animated={false}/>,
      ()=><Squirrel x={188} y={330} animated={false}/>,
      ()=><Butterfly x={BR[5].ex+16} y={BR[5].ey-12} animated={false}/>,
      ()=><Bird x={BR[8].ex+6} y={BR[8].ey-18} flip={true} animated={false}/>,
      ()=><Butterfly x={BR[0].ex-18} y={BR[0].ey-6} animated={false}/>,
      ()=><Bird x={BR[6].ex-2} y={BR[6].ey-22} flip={false} animated={false}/>,
      ()=><Squirrel x={172} y={310} animated={false}/>,
    ];
    const animalPositionsNew=[
      ()=><Bird x={BR[2].ex-4} y={BR[2].ey-20} flip={false} animated={true}/>,
      ()=><Squirrel x={188} y={330} animated={true}/>,
      ()=><Butterfly x={BR[5].ex+16} y={BR[5].ey-12} animated={true}/>,
      ()=><Bird x={BR[8].ex+6} y={BR[8].ey-18} flip={true} animated={true}/>,
      ()=><Butterfly x={BR[0].ex-18} y={BR[0].ey-6} animated={true}/>,
      ()=><Bird x={BR[6].ex-2} y={BR[6].ey-22} flip={false} animated={true}/>,
      ()=><Squirrel x={172} y={310} animated={true}/>,
    ];
    return(
      <div className="scr sp">
        <svg width="360" height="370" viewBox="0 0 360 370" style={{overflow:"visible"}}>
          {renderFullTree()}
          {FRUITS.slice(0,FRUITS.length).map((f,i)=>{
            const b=BR[f.bIdx];
            return <circle key={`ef-${i}`} cx={b.ex+f.ox} cy={b.ey+f.oy} r={f.r} fill={f.color} opacity=".9"/>;
          })}
          {animalPositions.slice(0,prevAnimalCount).map((render,i)=><g key={`ea-${i}`}>{render()}</g>)}
          {animalCount>0&&<g key="new-animal">{animalPositionsNew[animalCount-1]()}</g>}
        </svg>
        <div className="sp-txt">{msgs[Math.min(count-1,msgs.length-1)]}</div>
      </div>
    );
  }

  // Forest zoom-out transition (lessons 26+)
  if(isForest){
    return(
      <div className="scr sp">
        <svg width="360" height="370" viewBox="0 -40 560 500" style={{overflow:"visible"}}>
          <g style={{animation:"treesFadeIn 1.5s ease 1.5s forwards",opacity:0}}>
            <SmallTree x={50} y={380} scale={0.6} shade="dark"/>
            <SmallTree x={480} y={370} scale={0.55} shade="dark"/>
            <SmallTree x={100} y={400} scale={0.45} shade="light"/>
            <SmallTree x={430} y={395} scale={0.5} shade="light"/>
            <SmallTree x={30} y={420} scale={0.35} shade="dark"/>
            <SmallTree x={510} y={415} scale={0.4} shade="light"/>
            <Bush x={70} y={430} scale={0.8}/>
            <Bush x={460} y={425} scale={0.7}/>
            <Bush x={250} y={440} scale={0.6}/>
            <Bush x={150} y={445} scale={0.5}/>
            <Bush x={380} y={440} scale={0.55}/>
            <ellipse cx="280" cy="450" rx="260" ry="14" fill="#0d160d"/>
          </g>
          <g transform="translate(100,20)">
            {renderFullTree()}
            {FRUITS.map((f,i)=>{
              const b=BR[f.bIdx];
              return <circle key={`ef-${i}`} cx={b.ex+f.ox} cy={b.ey+f.oy} r={f.r} fill={f.color} opacity=".9"/>;
            })}
            <Bird x={BR[2].ex-4} y={BR[2].ey-20} flip={false} animated={false}/>
            <Squirrel x={188} y={330} animated={false}/>
            <Butterfly x={BR[5].ex+16} y={BR[5].ey-12} animated={false}/>
            <Bird x={BR[8].ex+6} y={BR[8].ey-18} flip={true} animated={false}/>
            <Butterfly x={BR[0].ex-18} y={BR[0].ey-6} animated={false}/>
            <Bird x={BR[6].ex-2} y={BR[6].ey-22} flip={false} animated={false}/>
            <Squirrel x={172} y={310} animated={false}/>
          </g>
        </svg>
        <div className="sp-txt">{msgs[Math.min(count-1,msgs.length-1)]}</div>
      </div>
    );
  }

  // Branch stage transition (lessons 2-11)
  return(
    <div className="scr sp">
      <svg width="360" height="370" viewBox="0 0 360 370" style={{overflow:"visible"}}>
        <ellipse cx="180" cy="360" rx="90" ry="9" fill="#0d160d"/>
        <line x1="180" y1="356" x2="180" y2="290"
          stroke="#6B4423" strokeWidth="7" strokeLinecap="round"/>
        <circle cx="180" cy="290" r="6" fill="#1B5E20" opacity=".75"/>

        {BR.slice(0,existingCount).map((b,i)=>(
          <g key={i}>
            <path d={`M${b.sx},${b.sy} Q${b.qx},${b.qy} ${b.ex},${b.ey}`}
              stroke="#8B5E33" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <circle cx={b.ex} cy={b.ey} r="21" fill="#1B5E20" opacity=".8"/>
            <circle cx={b.ex-9} cy={b.ey-7} r="14" fill="#2E7D32"/>
            <circle cx={b.ex+8} cy={b.ey-8} r="13" fill="#2E7D32"/>
            <circle cx={b.ex} cy={b.ey-14} r="12" fill="#388E3C"/>
            <circle cx={b.ex+2} cy={b.ey-4} r="7" fill="#4CAF50" opacity=".55"/>
          </g>
        ))}

        {newBranch&&(()=>{
          const b=newBranch;
          const len=Math.ceil(pathLen(b));
          return(
            <g>
              <path d={`M${b.sx},${b.sy} Q${b.qx},${b.qy} ${b.ex},${b.ey}`}
                stroke="#8B5E33" strokeWidth="2.5" strokeLinecap="round" fill="none"
                strokeDasharray={len} strokeDashoffset={len}
                style={{animation:"drawLine 1.2s ease .3s forwards"}}/>
              <circle cx={b.ex} cy={b.ey} r="21" fill="#1B5E20" opacity="0"
                style={{animation:"leafPop .6s ease 1.5s forwards",transformOrigin:`${b.ex}px ${b.ey}px`}}/>
              <circle cx={b.ex-9} cy={b.ey-7} r="14" fill="#2E7D32" opacity="0"
                style={{animation:"leafPop .5s ease 1.7s forwards",transformOrigin:`${b.ex-9}px ${b.ey-7}px`}}/>
              <circle cx={b.ex+8} cy={b.ey-8} r="13" fill="#2E7D32" opacity="0"
                style={{animation:"leafPop .5s ease 1.85s forwards",transformOrigin:`${b.ex+8}px ${b.ey-8}px`}}/>
              <circle cx={b.ex} cy={b.ey-14} r="12" fill="#388E3C" opacity="0"
                style={{animation:"leafPop .5s ease 2.0s forwards",transformOrigin:`${b.ex}px ${b.ey-14}px`}}/>
              <circle cx={b.ex+2} cy={b.ey-4} r="7" fill="#4CAF50" opacity="0"
                style={{animation:"leafPop .4s ease 2.15s forwards",transformOrigin:`${b.ex+2}px ${b.ey-4}px`}}/>
            </g>
          );
        })()}
      </svg>
      <div className="sp-txt">{msgs[Math.min(count-1,msgs.length-1)]}</div>
    </div>
  );
}

function Bird({x,y,flip,animated}){
  const s=flip?-1:1;
  return(
    <g transform={`translate(${x},${y}) scale(${s},1)`}
      style={animated?{animation:"birdLand 1s ease forwards",opacity:0}:{}}>
      <ellipse cx="0" cy="0" rx="5" ry="3.5" fill="#5D4037"/>
      <circle cx="5" cy="-1.5" r="2.5" fill="#6D4C41"/>
      <path d="M7,-1.5 L10,-2.5 L7.5,-1" fill="#FF8F00"/>
      <path d="M-3,-2 Q-6,-8 -1,-4" stroke="#5D4037" strokeWidth="1" fill="none"
        style={animated?{transformOrigin:"-3px -2px",animation:"flutter .4s ease infinite"}:{}}/>
      <path d="M-1,-3 Q-3,-9 2,-5" stroke="#5D4037" strokeWidth="1" fill="none"
        style={animated?{transformOrigin:"-1px -3px",animation:"flutter .4s ease .1s infinite"}:{}}/>
      <circle cx="6" cy="-2" r=".8" fill="#212121"/>
    </g>
  );
}

function Squirrel({x,y,animated}){
  return(
    <g transform={`translate(${x},${y})`}
      style={animated?{animation:"squirrelPeek .8s ease forwards",opacity:0}:{}}>
      <ellipse cx="0" cy="0" rx="4" ry="6" fill="#8D6E63"/>
      <circle cx="0" cy="-7" r="3.5" fill="#A1887F"/>
      <circle cx="-1.5" cy="-8" r="1.2" fill="#8D6E63"/>
      <circle cx="1.5" cy="-8" r="1.2" fill="#8D6E63"/>
      <circle cx="-1" cy="-7.2" r=".6" fill="#212121"/>
      <circle cx="1" cy="-7.2" r=".6" fill="#212121"/>
      <path d="M3,2 Q10,-6 6,-10" stroke="#A1887F" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </g>
  );
}

function Butterfly({x,y,animated}){
  return(
    <g transform={`translate(${x},${y})`}
      style={animated?{animation:"birdLand 1.2s ease forwards",opacity:0}:{}}>
      <line x1="0" y1="-2" x2="0" y2="3" stroke="#4E342E" strokeWidth=".6"/>
      <ellipse cx="-4" cy="-1" rx="4" ry="3" fill="#CE93D8" opacity=".8"
        style={{transformOrigin:"0px -1px",animation:"flutter .5s ease infinite"}}/>
      <ellipse cx="4" cy="-1" rx="4" ry="3" fill="#BA68C8" opacity=".8"
        style={{transformOrigin:"0px -1px",animation:"flutter .5s ease .15s infinite"}}/>
      <ellipse cx="-3" cy="1.5" rx="2.5" ry="2" fill="#AB47BC" opacity=".7"
        style={{transformOrigin:"0px 1px",animation:"flutter .5s ease .05s infinite"}}/>
      <ellipse cx="3" cy="1.5" rx="2.5" ry="2" fill="#9C27B0" opacity=".7"
        style={{transformOrigin:"0px 1px",animation:"flutter .5s ease .2s infinite"}}/>
    </g>
  );
}

function SmallTree({x,y,scale,shade}){
  const fills=shade==="dark"
    ?{trunk:"#4E342E",c1:"#1B5E20",c2:"#2E7D32",c3:"#388E3C"}
    :{trunk:"#5D4037",c1:"#2E7D32",c2:"#388E3C",c3:"#4CAF50"};
  return(
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <line x1="0" y1="0" x2="0" y2="-24" stroke={fills.trunk} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="0" cy="-28" r="12" fill={fills.c1} opacity=".85"/>
      <circle cx="-6" cy="-32" r="8" fill={fills.c2}/>
      <circle cx="5" cy="-33" r="7" fill={fills.c2}/>
      <circle cx="0" cy="-36" r="6" fill={fills.c3}/>
    </g>
  );
}

function Bush({x,y,scale}){
  return(
    <g transform={`translate(${x},${y}) scale(${scale||1})`}>
      <ellipse cx="0" cy="0" rx="14" ry="8" fill="#1B5E20" opacity=".7"/>
      <ellipse cx="-5" cy="-4" rx="9" ry="6" fill="#2E7D32" opacity=".8"/>
      <ellipse cx="6" cy="-3" rx="8" ry="5" fill="#388E3C" opacity=".7"/>
    </g>
  );
}

function TreeSVG({lessons,onBranchClick}){
  const branchCount=Math.min(Math.max(lessons.length-1,0),BR.length);
  const fruitCount=Math.max(0,Math.min(lessons.length-11,FRUITS.length));
  const showAnimals=lessons.length>18;
  const animalCount=showAnimals?Math.min(lessons.length-18,7):0;
  const isForest=lessons.length>25;

  const vb=isForest?"0 -40 560 500":"0 0 360 370";
  const svgW=isForest?560:360;
  const svgH=isForest?500:370;

  return(
    <svg width={svgW>400?360:svgW} height={svgH>400?370:svgH} viewBox={vb} style={{overflow:"visible"}}>
      {isForest&&(
        <g style={{animation:"treesFadeIn 1.2s ease forwards"}}>
          <SmallTree x={50} y={380} scale={0.6} shade="dark"/>
          <SmallTree x={480} y={370} scale={0.55} shade="dark"/>
          <SmallTree x={100} y={400} scale={0.45} shade="light"/>
          <SmallTree x={430} y={395} scale={0.5} shade="light"/>
          <SmallTree x={30} y={420} scale={0.35} shade="dark"/>
          <SmallTree x={510} y={415} scale={0.4} shade="light"/>
          <Bush x={70} y={430} scale={0.8}/>
          <Bush x={460} y={425} scale={0.7}/>
          <Bush x={250} y={440} scale={0.6}/>
          <Bush x={150} y={445} scale={0.5}/>
          <Bush x={380} y={440} scale={0.55}/>
          <ellipse cx="280" cy="450" rx="260" ry="14" fill="#0d160d"/>
        </g>
      )}

      <g transform={isForest?"translate(100,20)":""}>
        <ellipse cx="180" cy="360" rx="90" ry="9" fill="#0d160d"/>
        {lessons.length===0&&(
          <ellipse cx="180" cy="353" rx="12" ry="8" fill="#6B4423"
            style={{animation:"seedPulse 2s ease infinite"}}/>
        )}
        {lessons.length===1&&(
          <>
            <ellipse cx="180" cy="353" rx="10" ry="7" fill="#6B4423"/>
            <line x1="180" y1="349" x2="180" y2="316" stroke="#5C3D1E" strokeWidth="3" strokeLinecap="round"/>
            <ellipse cx="172" cy="314" rx="12" ry="7" fill="#2E7D32"
              style={{transformOrigin:"180px 316px",transform:"rotate(-35deg)"}}/>
            <ellipse cx="188" cy="312" rx="12" ry="7" fill="#388E3C"
              style={{transformOrigin:"180px 316px",transform:"rotate(35deg)"}}/>
          </>
        )}
        {lessons.length>=2&&(
          <>
            <line x1="180" y1="356" x2="180" y2="290"
              stroke="#6B4423" strokeWidth="7" strokeLinecap="round"/>
            <circle cx="180" cy="290" r="6" fill="#1B5E20" opacity=".75"/>
          </>
        )}
        {BR.slice(0,branchCount).map((b,i)=>{
          const lesson=lessons[i+1];
          const isNew=i===branchCount-1&&lessons.length<=11;
          const animStyle=isNew
            ?{animation:"nodeIn .7s ease forwards",transformOrigin:`${b.ex}px ${b.ey}px`,cursor:"pointer"}
            :{cursor:"pointer"};
          return(
            <g key={i} style={animStyle} onClick={()=>onBranchClick&&onBranchClick(lesson)}>
              <path d={`M${b.sx},${b.sy} Q${b.qx},${b.qy} ${b.ex},${b.ey}`}
                stroke="#8B5E33" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <circle cx={b.ex} cy={b.ey} r="21" fill="#1B5E20" opacity=".8"/>
              <circle cx={b.ex-9} cy={b.ey-7} r="14" fill="#2E7D32"/>
              <circle cx={b.ex+8} cy={b.ey-8} r="13" fill="#2E7D32"/>
              <circle cx={b.ex} cy={b.ey-14} r="12" fill="#388E3C"/>
              <circle cx={b.ex+2} cy={b.ey-4} r="7" fill="#4CAF50" opacity=".55"/>
            </g>
          );
        })}

        {FRUITS.slice(0,fruitCount).map((f,i)=>{
          const b=BR[f.bIdx];
          const isNew=i===fruitCount-1&&lessons.length<=18;
          return(
            <circle key={`fruit-${i}`}
              cx={b.ex+f.ox} cy={b.ey+f.oy} r={f.r}
              fill={f.color} opacity=".9"
              style={isNew?{
                animation:"fruitPop .6s ease forwards",
                transformOrigin:`${b.ex+f.ox}px ${b.ey+f.oy}px`
              }:{}}
            />
          );
        })}

        {animalCount>=1&&<Bird x={BR[2].ex-4} y={BR[2].ey-20} flip={false} animated={animalCount===1}/>}
        {animalCount>=2&&<Squirrel x={188} y={330} animated={animalCount===2}/>}
        {animalCount>=3&&<Butterfly x={BR[5].ex+16} y={BR[5].ey-12} animated={animalCount===3}/>}
        {animalCount>=4&&<Bird x={BR[8].ex+6} y={BR[8].ey-18} flip={true} animated={animalCount===4}/>}
        {animalCount>=5&&<Butterfly x={BR[0].ex-18} y={BR[0].ey-6} animated={animalCount===5}/>}
        {animalCount>=6&&<Bird x={BR[6].ex-2} y={BR[6].ey-22} flip={false} animated={animalCount===6}/>}
        {animalCount>=7&&<Squirrel x={172} y={310} animated={animalCount===7}/>}
      </g>
    </svg>
  );
}

function TreeScreen({lessons,onGrow,onBranchClick,onCatClick}){
  const branchCount=Math.max(lessons.length-1,0);
  const [showLessons,setShowLessons]=useState(false);
  return(
    <div className="scr ts">
      <div className="ts-hd">
        <div className="ey">Your Knowledge Tree</div>
        <div className="ts-ti">{lessons.length} {lessons.length===1?"lesson":"lessons"} learned</div>
      </div>
      <div className="tsv">
        <TreeSVG lessons={lessons} onBranchClick={onBranchClick}/>
      </div>
      <div className="tsf">
        <button className="gbtn" onClick={onGrow}>Keep Growing →</button>
      </div>
      {lessons.length>0&&(
        <button className="prev-btn" onClick={()=>setShowLessons(s=>!s)}>
          {showLessons?"Hide":"View"} Previous Lessons
        </button>
      )}
      {showLessons&&lessons.length>0&&(
        <div className="tlist">
          {lessons.map((l,i)=>(
            <button key={i} className="tlist-item" onClick={()=>onCatClick(l.cat)}>
              <span className="tlist-cat">{l.cat}</span>
              <span className="tlist-q">{l.topic}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App(){
  const [screen,setScreen]=useState("prompts");
  const [prompt,setPrompt]=useState(null);
  const [lessons,setLessons]=useState([]);
  const [isReview,setIsReview]=useState(false);
  const [filterCat,setFilterCat]=useState(null);
  const [skipCounts,setSkipCounts]=useState({});

  const handleSelect=(p,shown)=>{
    if(shown){
      setSkipCounts(sc=>{
        const next={...sc};
        shown.forEach(s=>{if(s.q!==p.q)next[s.q]=(next[s.q]||0)+1});
        return next;
      });
    }
    setPrompt(p);setIsReview(false);setScreen("lesson");
  };
  const handleComplete=()=>{
    setLessons(l=>[...l,{topic:prompt.q,cat:prompt.cat}]);
    setScreen("sprout");
  };
  const handleBranchClick=lesson=>{
    setPrompt({q:lesson.topic,cat:lesson.cat});
    setIsReview(true);
    setScreen("lesson");
  };
  const handleCatClick=cat=>{
    setFilterCat(cat);
    setScreen("prompts");
  };
  const handleGrow=()=>{
    setFilterCat(null);
    setScreen("prompts");
  };

  return(
    <div className="app">
      <style>{CSS}</style>
      {screen==="prompts"&&(
        <PromptsScreen
          onSelect={handleSelect}
          lessons={lessons}
          filterCat={filterCat}
          skipCounts={skipCounts}
          onBack={()=>{setFilterCat(null);setScreen("tree")}}
        />
      )}
      {screen==="lesson"&&(
        <LessonScreen
          prompt={prompt}
          onBack={()=>setScreen(isReview?"tree":(filterCat?"prompts":"prompts"))}
          onComplete={handleComplete}
          isReview={isReview}
        />
      )}
      {screen==="sprout"&&(
        <SproutScreen count={lessons.length} onDone={()=>setScreen("tree")}/>
      )}
      {screen==="tree"&&(
        <TreeScreen lessons={lessons} onGrow={handleGrow} onBranchClick={handleBranchClick} onCatClick={handleCatClick}/>
      )}
    </div>
  );
}
