---
title: "Courier vs Novu vs Knock: Notification Preferences for Investor Portals"
description: "Compare how notification tools manage recipient preferences across distribution updates, account alerts and newsletters."
date: "2026-11-10"
category: "Vendor Comparisons"
slug: "courier-vs-novu-vs-knock-investor-notification-preferences"
considerationAfterTable: "true"
answer: "Courier, Novu and Knock all offer recipient preference controls. Compare them by testing whether opting out of an optional newsletter suppresses only that newsletter and leaves unrelated account notices intact. Ask each provider to show how your support team can explain a suppressed message."
image: "/assets/blog-images/courier-vs-novu-vs-knock-investor-notification-preferences.svg"
imageAlt: "Courier vs Novu vs Knock: Notification Preferences for Investor Portals editorial infrastructure visual"
socialImage: "/assets/social/blog-courier-vs-novu-vs-knock-investor-notification-preferences.png"
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

## Give each provider the same preference scenario

Create a test investor who opts out of marketing email but still needs statements in their portal. Send the same event twice, then change the investor's preference and rerun it. Ask each provider to show how global defaults, subscriber preferences and workflow overrides interact, and which log shows the final routing decision. Require a demonstration of any override before counting it as supported.
