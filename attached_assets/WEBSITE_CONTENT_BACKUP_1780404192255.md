# Tracklete Website Content Backup

Backup date: 2026-06-01

This document captures the written content currently present in the website repository, including rendered page copy, fallback CMS content, navigation, footer, legal placeholders, demo data, testimonials, pricing, and unused-but-written section copy. The local `website.db` file was empty when this backup was created, so CMS-backed blog and team content is represented by the fallback content in `src/lib/fallback-content.ts`.

## Site Metadata

Site title: Tracklete | Performance Platform for Rowing Clubs

Site description: Tracklete helps rowing teams manage training, performance, and communication in one premium platform.

Default site URL used by sitemap/robots: https://tracklete.io

Sitemap pages:

- `/`
- `/blog`
- `/contact`

## Navigation

Primary navigation:

- Home
- Features
- Pricing
- Enterprise
- Blog

Primary calls to action:

- Log in: https://rowing.tracklete.io/#/login
- Book a Demo: `/contact`

Logo alt text:

- Tracklete

## Home Page

### Hero

Eyebrow:

Trusted by elite rowing programmes

Headline:

One performance platform for every seat in the boat.

Body:

Training plans, attendance, athlete readiness, and full club oversight in one clear command center for athletes, coaches, and federations.

Calls to action:

- Book a Demo
- Log in

Hero image alt text:

Rowers and coaches gathering by a lakeside at sunrise

Proof points:

| Value | Label |
| --- | --- |
| 40+ | Clubs onboarded |
| 500+ | Athletes managed |
| 4 | National programmes |

### Trusted By Bar

Label:

Trusted by 40+ rowing programmes

Displayed names:

- W.S.R. Argo
- Nereus
- Aegir
- Skadi
- Strava
- Concept2

### Audience Section

Eyebrow:

Built for everyone on the water

Headline:

For athletes, coaches, and clubs.

Audience cards:

| Label | Headline | Image alt text |
| --- | --- | --- |
| For athletes | Track your training, own your progress | Female athlete smiling in sculling boat at golden hour |
| For coaches | See the whole crew in one view | Coach giving instructions with megaphone from motorboat |
| For clubs | Run your entire programme from one platform | Club support team on coaching boat on the river |

## Product Tour

Eyebrow:

Product tour

Headline:

Every workflow your crew actually uses.

Tabs:

- Fitness
- Attendance
- Team planning
- Bodystats
- Ergo tracking

Application preview label:

Tracklete Application Preview

Application preview headline:

One crew operating view across performance and planning

Badges:

- Live modules
- Women VIII

### Fitness Tab

Panel title:

Understanding your fitness metrics

Panel copy:

Three graphs built from GPS heart-rate data: Fitness & Fatigue, Form (TSB), and Workload Ratio (ACWR).

Button:

Read more...

Fitness controls:

- 30d
- 90d
- 180d

Graph labels:

- Fitness & Fatigue
- 3-day decay forecast
- Form
- Freshness
- ACWR
- 0.79 easing

### Attendance Tab

Heading:

March 2026

Subheading:

Week overview - Monday / Sunday

Attendance table:

| Week | Time | Sport | Description | LV | MV | RM | SJ | TB |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 12 | 06:30 | Row | Starts + race pieces | yes | yes | maybe | yes | yes |
| 12 | 18:00 | Erg | Threshold block | yes | maybe | yes | yes | yes |
| 12 | 07:15 | Bike | Recovery ride | yes | yes | yes | maybe | yes |

### Team Planning Tab

Bodystat heading:

Today's morning check-in

Bodystat fields:

| Metric | Value |
| --- | --- |
| Weight | 72.6 |
| Heart rate | 47 |
| Sleep | 8.2h |
| HRV | 64 |

Training overview:

March 2026

Training table:

| Day | Time | Sport | Description | Attend |
| --- | --- | --- | --- | --- |
| 12 | 06:30 | Row | Starts + race pieces | Going |
| 13 | 18:00 | Erg | 3x15 min threshold | Maybe |
| 14 | 07:15 | Bike | Recovery spin + mobility | Going |

Analytics heading:

Week 12 analytics

Analytics subheading:

March 2026

Analytics values:

- Distance: 84.2 km
- +12.4 km vs last week
- Time by activity
- Row 220 min
- Erg 75 min
- Bike 45 min
- Time spent in each heart rate zone

### Bodystats Tab

Graph heading:

Graph

Graph copy:

To load more data, scroll down the page

Button:

Download

Bodystats table:

| Date | Weight | HR | Rate | Sleep | HRV | Comment |
| --- | --- | --- | --- | --- | --- | --- |
| 17 Mar | 72.6 | 47 | 4.5 | 8.2 | 64 | Recovered well |
| 16 Mar | 72.8 | 49 | 4.0 | 7.6 | 59 | Slightly heavy legs |
| 15 Mar | 72.5 | 46 | 4.5 | 8.4 | 66 | Good baseline |

### Ergo Tracking Tab

Event description filters:

- 2k test
- 6x500m
- 4x10 min
- 30R20

Unit choices:

- Split (/500m)
- Power (W)

Scores table:

| Athlete | 2k test, 12 Mar | 6x500m, 05 Mar | 30R20, 26 Feb |
| --- | --- | --- | --- |
| Lieke van Dijk | 1:51.2 | 1:49.8 | 1:54.1 |
| Mats Vermeer | 1:47.5 | 1:46.9 | 1:50.3 |
| Roos Jansen | 1:52.8 | 1:51.4 | 1:55.6 |
| Sam Blom | 1:48.9 | 1:48.1 | 1:52.0 |

## Features Grid

Eyebrow:

Everything included

Headline:

Everything a rowing programme needs, in one place.

Body:

From morning athlete check-ins to club-wide analysis -- one platform for the whole programme, with no external tools required.

### 01. Training & Planning

Title:

Week schedule with attendance built in

Body:

Every session shows who responded, who is going, and coach notes -- no separate attendance tool needed.

Demo table:

| Day | Time | Sport | Session | RSVP |
| --- | --- | --- | --- | --- |
| 12 | 06:30 | Row | Starts + race pieces | Going |
| 13 | 18:00 | Erg | 3x15 min threshold | Maybe |
| 14 | 07:15 | Bike | Recovery spin + mobility | Going |

### 02. Bodystats & Wellness

Title:

Daily check-ins coaches can act on

Body:

Weight, HRV, sleep, resting HR, and injury notes -- lightweight enough to complete every morning.

Example values:

- Body weight: 72.6 kg
- HRV: 64 ms
- Sleep: 8h 12m

### 03. Integrations

Title:

Strava and Concept2 keep data in sync

Body:

Activities import without manual entry, so the weekly picture is always current.

Example integrations:

- Strava: 8 activities synced, Active
- Concept2: Erg pieces linked to events, Linked

### 04. Fitness Intelligence

Title:

CTL, ATL, Form, and ACWR -- built in

Body:

GPS heart-rate data feeds a dedicated fitness tab for coaches who want more than weekly totals, with no extra tools.

Tags:

- CTL fitness
- ATL fatigue
- Form (TSB)
- ACWR
- 3-day forecast

### 05. Club Analysis

Title:

Compare athletes and crews across any metric

Body:

Leaderboards and analysis views span distance, time, power, and erg scores across your full programme.

Example rankings:

- Women VIII: 92%
- Development crew: 81%
- Lightweights: 69%

### 06. Coach Overview

Title:

Scan the entire squad before the morning session

Body:

Attendance, readiness, and training load across all athletes -- visible in one view, without opening multiple tabs.

Summary stats:

- 12 / 14: Going tomorrow
- 11: Bodystats logged
- 84.2 km: Crew load

Athlete readiness table:

| Athlete | Sleep | RHR | HRV |
| --- | --- | --- | --- |
| Lieke | 8h 12m | 47 | 64 |
| Mats | 6h 02m | 54 | 49 |
| Roos | 7h 44m | 48 | 61 |

### 07. GPS Analytics

Title:

Distance, zones, and momentum every week

Body:

Summaries of distance, time by activity, and heart rate zones from GPS and erg data -- no extra processing required.

Example:

- Total distance: 84.2 km
- Heart rate zones

## Testimonials

Eyebrow:

Testimonials

Headline:

Trusted by coaches who need clarity before the next session starts.

Intro:

Purpose-built for rowing teams, Tracklete replaces scattered updates with one calm command view for athletes, coaches, and club staff.

### Highlighted Testimonial

Image alt text:

Rower in action on the water

Label:

Nereus - Head Coach

Club snapshot:

- Athletes: 32
- Coaches: 6
- Time saved: 12 hrs / week

Eyebrow:

Highlighted testimonial

Quote:

"Tracklete gave our staff the first real overview we've had across training load, attendance, and recovery. It made planning feel calm again."

Attribution:

Maarten Lievens, Head coach, Nereus

Calls to action / tags:

- Talk to sales
- 12 hours saved each week

### Supporting Testimonials

Quote:

"We finally have one place for attendance, training notes, and body metrics. Coaches spend less time chasing updates and more time coaching."

Attribution:

Lotte van Dijk, Club coordinator, Aegir

Quote:

"Athletes actually fill it in because it feels lightweight. That consistency gives us better context before small issues become missed sessions."

Attribution:

Milan Vermeer, Performance coach, Skadi

Quote:

"The weekly overview changed our race prep. Everyone knows the plan, who is available, and where recovery needs attention."

Attribution:

Sanne Meijer, Lead athlete, Argo

## Comparison

Eyebrow:

Comparison

Headline:

One quick look at where Tracklete stands out.

Body:

Tracklete brings performance tracking and club operations together, so teams do not need to stitch multiple tools into one workflow.

Legend:

- Included
- Partial or manual
- Missing or limited

Columns:

- Tracklete: Best fit
- Excel: Alternative
- TrainingPeaks: Alternative
- iCrew: Alternative
- CrewNerd: Alternative

| Feature | Tracklete | Excel | TrainingPeaks | iCrew | CrewNerd |
| --- | --- | --- | --- | --- | --- |
| Training schedules | Included | Partial or manual | Included | Included | Missing or limited |
| Attendance tracking | Included | Partial or manual | Missing or limited | Included | Missing or limited |
| Erg + Concept2 workflow | Included | Partial or manual | Included | Partial or manual | Missing or limited |
| Bodystats and readiness | Included | Partial or manual | Included | Missing or limited | Missing or limited |
| Fitness tab for coaches | Included | Partial or manual | Included | Missing or limited | Missing or limited |
| GPS workout review | Included | Partial or manual | Partial or manual | Missing or limited | Included |
| Rigging and fleet context | Included | Partial or manual | Missing or limited | Included | Missing or limited |
| Club-wide analysis | Included | Partial or manual | Partial or manual | Missing or limited | Missing or limited |

## Pricing

Eyebrow:

Pricing

Headline:

Start with the athlete view, then scale to your crew or entire club.

Body:

Tracklete is free for personal use. When you need scheduling, attendance, shared analytics, and club-wide coordination, teams and clubs can upgrade per member.

### Personal

Label:

Personal

Title:

Free for personal use

Body:

Individual athletes can use Tracklete for their own training data, schedules, wellness tracking, and progress without a paid team or club plan.

CTA:

Get started free

### Team Plan

Name:

Team

Price:

€2.49 / Member / Month

CTA:

Sign Up

Features:

- Training schedules
- Ergometer tracking
- GPS & Heartrate
- Automatic imports (Strava)
- Progress reports
- Track bodystats
- Team: Schedule trainings
- Team: Assign roles
- Team: Track the progress

### Club Plan

Name:

Club

Badge:

Popular

Price:

€2.99 / Member / Month

CTA:

Sign Up

Features:

- All Team features
- Unlimited teams and team memberships
- Extra user roles
- Advanced graphing and reporting
- Custom graphs and data analysis

### Elite Plan

Name:

Elite

Price:

€9.49 / Member / Month

CTA:

Contact us

Features:

- All Club features
- Telemetry
- Custom analyses
- Priority support
- Third party integrations

### Pricing Note

Tracklete is free for personal use, and paid for teams or clubs. You can either pay quarterly, or make a yearly prepayment which gives you a 10% discount. No matter which plan you choose, new members can be added at any time.

## Team

Eyebrow:

Team

Headline:

The people behind Tracklete

Fallback team members:

| Name | Title | Profile picture |
| --- | --- | --- |
| Hidde de Vries | Co-founder | https://i.pravatar.cc/240?img=12 |
| Stef Schenkelaars | Co-founder | https://i.pravatar.cc/240?img=32 |
| Ferron van Zomeren | Engineering | https://i.pravatar.cc/240?img=56 |

## Blog

### Blog Preview

Eyebrow:

Blog

Headline:

Insights from Tracklete

Link:

View all posts

### Blog Index Page

Page title:

Blog

Intro:

Training insights, product updates, and practical coaching guidance.

Link text for each post:

Read post

### Fallback Blog Posts

#### Weekly activity

Author:

Tracklete Team

Date:

2026-03-01

Slug:

weekly-activity

Content:

Weekly insights that keep your athletes motivated, consistent, and accountable.

#### Improved attendance through training logs

Author:

Tracklete Team

Date:

2026-02-14

Slug:

improved-attendance-through-training-logs

Content:

Goal-setting and attendance logging are proven ways to improve team performance.

#### Synchronising Tracklete with Concept2 Logbook

Author:

Tracklete Team

Date:

2026-01-29

Slug:

sync-tracklete-with-concept2-logbook

Content:

How to automatically sync ergometer results from Concept2 into Tracklete.

## Contact Page

Metadata title:

Contact | Tracklete

Page title:

Contact

Intro:

Interested in Tracklete for your team or society? Reach out and we will help you get started.

Contact cards:

- Email: sales@tracklete.io
- General feedback: feedback@tracklete.io

## Privacy Policy Page

Metadata title:

Privacy Policy | Tracklete

Eyebrow:

Legal

Page title:

Privacy Policy

Intro:

This page is a placeholder for Tracklete's privacy policy. It can be replaced with the final legal copy when available.

### Who We Are

Tracklete provides software for training schedules, performance analytics, bodystats, attendance, and crew coordination.

### Contact

- Libellenlaan 73, 5692WB Son en Breugel
- Email: info@tracklete.io
- KVK: 77437489
- Btw: NL861007359B01

### Final Policy Text

Add the official privacy policy content here, including information on what personal data is collected, why it is processed, how long it is retained, and how users can contact Tracklete about privacy questions.

## Terms And Conditions Page

Metadata title:

Terms and Conditions | Tracklete

Eyebrow:

Legal

Page title:

Terms and Conditions

Intro:

This page is a placeholder for Tracklete's terms and conditions. It can be replaced with the final legal copy when available.

### Company Details

- Tracklete
- Libellenlaan 73, 5692WB Son en Breugel
- Email: info@tracklete.io
- KVK: 77437489
- Btw: NL861007359B01
- Bank: NL30 BUNQ 2042 1893 16

### Using Tracklete

Add the official terms here, including account usage, payment terms, acceptable use, liability, and service conditions for athletes, teams, and clubs.

### Updates

This section can describe how Tracklete updates its terms and how users will be informed when those changes take effect.

## Footer

Brand:

Tracklete

Body:

One platform for training schedules, analytics, bodystats, attendance, and crew coordination.

Copyright:

(c) [current year] Tracklete Rowing

Contact:

- Libellenlaan 73, 5692WB Son en Breugel
- Email: info@tracklete.io
- KVK: 77437489
- Btw: NL861007359B01
- Bank: NL30 BUNQ 2042 1893 16

Legal links:

- Privacy policy
- Terms and conditions

## Additional Written Copy In Unused Components

The following copy exists in component files but is not currently imported by the active home page. It is included here because it may represent earlier content direction worth preserving.

### App Showcase

Eyebrow:

Inside Tracklete

Headline:

Built around the real rhythm of a crew week.

Body:

The homepage section should answer one question clearly: what does Tracklete help a coach or club do better? The answer is not one chart. It is visibility across people, training, and planning.

Product flow:

1. Athletes log their daily state
   Bodystats stay lightweight enough to complete every morning, while still giving coaches meaningful context around recovery and injury.
2. Training data arrives automatically
   Strava activities, Concept2 pieces, and GPS-based sessions feed the same weekly picture instead of living in separate tools.
3. Coaches scan the whole crew fast
   Attendance, analytics, and crew bodystats can be reviewed at a glance so interventions happen before issues compound.

Coach command view:

See the crew pulse without opening six tabs

This layout prioritizes the things a coach scans first: who replied, who logged bodystats, who looks off baseline, and how the week is stacking up.

Stats:

- Attendance: 12 / 14 confirmed for tomorrow
- Bodystats: 11 athletes checked in today
- Weekly load: 84.2 km crew total so far

Athlete readiness board:

Coach scan

| Athlete | Sleep | Sleep delta | RHR | RHR delta | HRV | HRV delta |
| --- | --- | --- | --- | --- | --- | --- |
| Lieke | 8h 12m | +24m | 47 | -2 | 64 | +5 |
| Mats | 6h 02m | -1h 03m! | 54 | +6! | 49 | -7! |
| Roos | 7h 44m | +11m | 48 | -1 | 61 | +3 |
| Sam | 5h 51m | -52m! | 57 | +5! | 43 | -8! |

Next sessions:

This week

- Tue 06:30: Starts + race pieces, 12 going
- Wed 18:00: Erg threshold block, 9 going
- Thu 07:15: Recovery ride, 7 going

### Feature Demos

Eyebrow:

Product highlights

Headline:

The workflows that make Tracklete feel complete

Body:

Each section mirrors a real part of the product: athlete capture, coach review, team coordination, and club-wide visibility.

Feature cards:

1. Training week overview
   The dashboard timeline brings schedules, comments, videos, and attendance into one fast daily view for athletes and crews.
2. Weekly analytics
   GPS and heart rate summaries show distance, time by activity, and momentum across the week.
3. Bodystats and wellness
   Capture weight, resting HR, HRV, sleep, feeling, and injury notes in a format coaches can actually use.
4. Attendance and planning
   Track RSVPs, manage the crew schedule, and keep the week plan visible without separate admin tools.
5. Integrations and imports
   Strava and Concept2 imports feed the same athlete record, so data arrives without extra cleanup.
6. Club analysis and leaderboards
   Compare athletes, crews, and societies across distance, time, power, and more with analysis views and rankings.

Training week overview demo:

- May 2026
- 06:30 Row: Going
- Starts + race pieces
- 18:00 Erg rate ladder: comments
- Coach note + video attached

Weekly analytics demo:

- Week 19
- Distance: 84.2 km
- +12% vs last week
- Time by activity: Row 220 min, Erg 75 min, Bike 45 min
- Heart rate zones

Bodystats demo:

| Athlete | Sleep | RHR | HRV | Flag |
| --- | --- | --- | --- | --- |
| Lieke | 8h 12m | 47 | 64 | ok |
| Mats | 6h 02m | 54 | 49 | watch |
| Sam | 5h 51m | 57 | 43 | injury |

Attendance demo:

| Athlete | Mon | Tue | Wed | Thu |
| --- | --- | --- | --- | --- |
| Lieke | yes | yes | maybe | yes |
| Mats | yes | maybe | yes | yes |
| Roos | maybe | yes | yes | yes |

Integrations demo:

- Always in sync
- Strava: 8 new activities imported, Active
- Concept2: Erg pieces linked to events, Linked

Analysis demo:

- User / crew / society
- Total Distance
- T2 Time
- Erg Power
- Women VIII: 92%
- Development crew: 81%
- Lightweights: 69%

### Fitness Feature Section

Eyebrow:

Fitness intelligence

Headline:

A dedicated fitness tab for coaches who want more than weekly totals.

Body:

Tracklete includes a focused fitness view built from GPS heart-rate data. It gives coaches a compact read on fitness, fatigue, form, and workload balance without forcing them into a separate analysis tool.

Tags:

- GPS heart-rate based
- Fitness and fatigue trends
- Race-readiness cues

Preview label:

Tracklete fitness tab

Preview headline:

One clean view for load, form, and recovery

Fitness vs fatigue:

Inspired by standard performance management charts: CTL rises more gradually, while ATL swings harder after heavy blocks and recovery.

Tags:

- 3-day tail
- CTL fitness
- ATL fatigue
- taper forecast

Form panel:

Freshness

The form panel helps coaches see when the squad is trending toward productive fatigue or race freshness.

ACWR panel:

0.79 easing

A compact workload ratio adds a quick warning for load spikes or sharp drop-offs.

What it adds:

A lightweight proof point, not a wall of physiology.

Signals:

1. See the trend
   A coach can tell in seconds whether load is building productively or recovery is overdue.
2. Spot race readiness
   Form bands give a quick sense of whether an athlete is carrying useful fatigue or arriving fresh.
3. Plan the next days
   The short forecast tail helps crews shape rest days and taper blocks without guesswork.

## Media And Visual Assets Referenced By Content

Images referenced by active page content:

- `/images/1000050662.jpg`: Rowers and coaches gathering by a lakeside at sunrise
- `/images/136A8247-scaled.jpg`: Female athlete smiling in sculling boat at golden hour
- `/images/136A7385-e1757931254910.jpg`: Coach giving instructions with megaphone from motorboat
- `/images/136A5786-scaled.jpg`: Club support team on coaching boat on the river
- `/images/136A6073-scaled.jpg`: Rower in action on the water

Other public images present in the repository:

- `/images/136A5933-scaled.jpg`
- `/images/136A6256-scaled.jpg`
- `/images/136A6052-scaled.jpg`
- `/images/P1250239-scaled.jpg`

Logo:

- `/tracklete-logo.svg`

