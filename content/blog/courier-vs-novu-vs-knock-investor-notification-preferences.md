---
title: "Courier vs Novu vs Knock: Notification Preferences for Investor Portals"
description: "Compare how notification tools manage recipient preferences across distribution updates, account alerts and newsletters."
date: "2026-11-10"
modifiedDate: "2026-11-15"
category: "Vendor Comparisons"
slug: "courier-vs-novu-vs-knock-investor-notification-preferences"
considerationAfterTable: "true"
answer: "Courier, Novu and Knock all offer recipient preference controls. Compare them by testing whether opting out of an optional newsletter suppresses only that newsletter and leaves unrelated account notices intact. Ask each provider to show how your support team can explain a suppressed message."
image: "/assets/blog-thumbnails/courier-vs-novu-vs-knock-investor-notification-preferences-creative-20261120.webp"
imageAlt: "FluidRWA: Courier vs Novu vs Knock: Notification Preferences for Investor Portals. Notification channels branch from investor preference controls."
socialImage: "/assets/social/courier-vs-novu-vs-knock-investor-notification-preferences-creative-20261120.jpg"
faq1q: "What should I test in a notification preference system?"
faq1a: "Test whether opting out of an optional newsletter suppresses only that newsletter and leaves unrelated account notices intact."
faq2q: "How do I run the test?"
faq2a: "Create two fictional investors. One opts out of a newsletter and the other opts out of email alerts for a particular topic. Trigger a newsletter, a document-ready update and an account notice, and record the expected recipients and channels before sending."
faq3q: "Who should own the final send decision?"
faq3a: "The portal should stay accountable for the final send decision. Ask each provider how your support team can explain a suppressed message."
imageLocked: "true"
socialImageLocked: "true"
---

Investor portals need to send different kinds of messages. A reader who opts out of a newsletter may still expect to hear that a distribution statement is ready. Compare how each system represents those choices and how easily support can explain why a message was or was not sent.

| Provider | What to evaluate | Demo case |
| --- | --- | --- |
| Courier | Recipient preferences in the notification workflow | Turn off an optional topic and confirm it does not suppress an unrelated account update. |
| Novu | Subscriber and workflow preferences | Test the interaction between subscriber choices and workflow configuration. |
| Knock | Recipient preferences across workflows and channels | Switch off one channel and verify that the workflow respects the resulting preference. |

## Test the settings with two accounts

Create two fictional investors. One opts out of a newsletter, and the other opts out of email alerts for a particular topic. Trigger a newsletter, a document-ready update and an account notice. Record the expected recipients and channels before pressing send. Review each send or suppression with the support team.

## Decide who owns the preference record

Ask how the portal exports or synchronizes a preference change and what happens if an investor updates a setting while a message is queued. Decide which notifications are optional and which your compliance team treats differently. A platform's configuration cannot make that decision for you. Keep a record of the policy version and a reason for each suppression so support can investigate without reading the investor's documents.

## Documentation

- [Courier documentation](https://www.courier.com/docs/)
- [Novu documentation](https://docs.novu.co/)
- [Knock preferences](https://docs.knock.app/preferences/overview)

## Make the portal accountable for the final send decision

Keep a table that maps each portal event to its workflow, allowed channels and whether the investor has a choice. A preference panel can change an email subscription, but it may also need to change the behavior of scheduled delivery and resend jobs. Record the scope of each setting: a single topic, a channel within one workflow or a global preference. Ask the policy owner to approve that mapping before you implement any overrides.

Courier should demonstrate what happens when the same recipient uses multiple channels and opts out of only one. Novu should demonstrate how a subscriber setting interacts with workflow configuration. Knock should show the scope at which your application can read and write a preference. Use the same subscriber IDs and workflow events across demos. Verify the final delivery result from actual test records rather than inferring it from the setting screen.

## Test the portal when records disagree

Try changing the preference in two browser tabs. Your own portal must decide which update wins and what version it displays after refresh. Trigger a send while the change is in progress and test against your team's documented policy. If the system sends or suppresses a message, support should be able to identify the policy and preference in effect at that time.

Add a bounced address, a duplicate trigger and a provider outage to the trial. A bounce does not mean the investor opted out, and a suppression does not mean the communication is no longer required. Keep failed delivery and user choice as separate outcomes.

## Keep investor information out of delivery tooling where possible

Ask what data the workflow needs. A message that a statement is ready rarely needs to contain the statement itself. Use test data to inspect message logs and exports, then decide what personal information support can retrieve. Measure whether an operator can answer an investor's complaint without opening any investment documents. The provider guides above establish a starting point for testing; they do not establish policy compliance or delivery performance.

## Give each provider the same preference scenario

Create a test investor who opts out of marketing email but still needs statements in their portal. Send the same event twice, then change the investor's preference and rerun it. Ask each provider to show how global defaults, subscriber preferences and workflow overrides interact, and which log shows the final routing decision. Require a demonstration of any override before counting it as supported.
