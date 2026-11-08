// Posts published only on this site (not on Substack). Blog.js merges these with the Substack feed.
const localPosts = [
  {
    title: 'Customer feedback is the verification layer for product development',
    date: '2026-11-06T15:51:38Z',
    description:
      'Work is only as automatable as it is verifiable. For product work, the only reliable check is customers.',
    content: `
<p><img src="/posts/verification-layer.jpg" alt="Customer feedback is the verification layer that makes automating product development feasible." /></p>
<p>Work is only as automatable as it is verifiable. This seems obvious for code. For product work, at the end of the day, the only reliable check is customers. Only customers can verify that a product got better for them.</p>
<p>This makes customer feedback the most explicit, reliable way to verify product work. Better systems around gathering, understanding, and leveraging customer feedback makes more of product development automatable by making verification possible.</p>
<p>Here as well, there's a spectrum of ambiguity, which dictates the need for humans in the loop.</p>
<p><strong>Bugs.</strong> The product breaks a promise it already makes. A customer's bug report itself is the trigger, and the test to verify the fix. Systems should be able to autonomously trigger, patch, and verify the fix, without humans in the loop. We've already seen customers automate this on top of <a href="https://www.enterpret.com" target="_blank" rel="noreferrer">Enterpret</a>.</p>
<p><strong>Paper cuts.</strong> The product works as built, but small friction sits on an existing path. A customer complaint is the signal that there is friction. Systems running on your customer's feedback should automatically surface these, trigger agents that can raise an obvious fix, and then verify against future customer feedback. Humans should only need to step in when the fix isn't obvious. In all fairness, we haven't seen this be fully automated yet. There are teams who're coming close.</p>
<p><strong>1.1 improvements.</strong> The product keeps the same promise, but the path is longer than it should be, and there are several reasonable fixes. Customer feedback shows where users struggle. Systems running on your customer's feedback should automatically surface that struggle, cluster it, and verify against behaviour and future feedback that the path got easier. Humans should still pick among the reasonable fixes. We haven't seen the design choice itself get automated yet. What we're seeing is the loop around it getting shorter.</p>
<p><strong>New capabilities.</strong> Extending the promise: something the product does not do yet. Feedback usually arrives as a proposed solution. What it actually verifies is whether the job is real, and widely shared. Systems should make that check cheap. How many customers, how often, how costly the workaround. Humans still decide what to build.</p>
<p><strong>Strategic decisions.</strong> What the product should be, and what to bet on next. This is where human judgement has the highest leverage. Customer feedback here is early evidence. Signals, for the right direction.</p>
<p>Conversations about self-improving products generally overlook this spectrum. The more precise and detailed your feedback systems, the further into ambiguity you can still verify, and the more of product development you can automate.</p>
<p><em>First posted <a href="https://x.com/kaushalvivek/status/2118733053371580782" target="_blank" rel="noreferrer">on X</a>.</em></p>
`,
  },
];

export default localPosts;
