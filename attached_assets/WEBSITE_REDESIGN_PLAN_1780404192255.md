# Tracklete Website Redesign Plan

Last updated: 2026-06-02

This plan turns the content backup, rebuild brief, style guide, and visual references into an implementation blueprint.

## Source Documents

Read these before starting redesign work:

- `WEBSITE_REDESIGN_STATE.md` for current progress and next step.
- `WEBSITE_REBUILD_BRIEF.md` for product positioning, audience, features, and must-have sections.
- `WEBSITE_STYLE_GUIDE.md` for visual direction and reference synthesis.
- `WEBSITE_CONTENT_BACKUP.md` for exhaustive copy and content inventory.
- `Screenshot styles/` for visual references.

## Working Design Direction

Swiss editorial product narrative with human sports-tech imagery.

The redesign should combine:

- Paper-style long product storytelling.
- Catalis-style people, warmth, pricing, testimonials, and CTAs.
- Swiss grid discipline and precise typography.
- Rowing-specific photography.
- Large, readable product UI sections.

## Implementation Strategy

Do not delete the whole app or start from an empty repo.

Keep:

- Next/Payload setup.
- Existing route structure.
- Public images and logo.
- Blog/contact/legal/team structure.
- Content and style documentation.

Replace or heavily revise:

- Homepage sections.
- Feature/product demo components.
- Global visual system where needed.
- Section composition and spacing.

Clean up only after the new homepage works:

- Remove unused old components.
- Remove obsolete CSS.
- Simplify duplicate demo components.

## Proposed Homepage Flow

### 1. Hero

Goal:

Immediately communicate that Tracklete is a rowing performance and operations platform.

Ingredients:

- Large rowing/human image.
- Strong Tracklete statement.
- Primary CTA: Book a Demo.
- Secondary CTA: Log in or View product.
- Product UI preview visible near the first viewport.
- Proof points: clubs, athletes, national programmes.

Core copy:

One performance platform for every seat in the boat.

### 2. Proof And Integrations

Goal:

Show credibility and ecosystem fit.

Content:

- 40+ rowing programmes.
- Club names if verified.
- Strava and Concept2 as integrations, not clubs.

### 3. Audience Section

Goal:

Explain who Tracklete serves.

Cards:

- Athletes: Track your training, own your progress.
- Coaches: See the whole crew in one view.
- Clubs: Run your entire programme from one platform.

Use real people/rowing imagery.

### 4. Product Story: Planning And Attendance

Goal:

Show weekly planning and attendance as a core operational workflow.

Include:

- Schedule table.
- Attendance statuses.
- Session examples.
- Coach notes.

### 5. Product Story: Bodystats And Readiness

Goal:

Show daily athlete check-ins and coach readiness review.

Include:

- Weight, HRV, sleep, resting HR.
- Comments/injury notes.
- Squad readiness board.

### 6. Product Story: Fitness Analytics

Goal:

Show Tracklete has deeper performance intelligence.

Include:

- CTL fitness.
- ATL fatigue.
- Form / TSB.
- ACWR.
- Heart-rate/GPS data.
- Race-readiness cues.

### 7. Product Story: Erg, Strava, Concept2

Goal:

Show external data and erg workflows come together.

Include:

- Concept2 workflow.
- Strava imports.
- Erg scores.
- Linked training events.

### 8. Product Story: Club Overview

Goal:

Show why clubs/federations need Tracklete beyond individual tracking.

Include:

- Multiple teams.
- Crew comparison.
- Club-wide analysis.
- Leaderboard/reporting examples.

### 9. Comparison

Goal:

Clarify why Tracklete is better than stitching together tools.

Compare against:

- Excel
- TrainingPeaks
- iCrew
- CrewNerd

### 10. Testimonials

Goal:

Add trust and people.

Use current testimonials only if verified.

### 11. Pricing

Goal:

Make plans clear and easy to compare.

Plans:

- Personal: free.
- Team: EUR 2.49 / member / month.
- Club: EUR 2.99 / member / month.
- Elite: EUR 9.49 / member / month.

### 12. Final CTA And Footer

Goal:

End with a direct conversion path and complete contact/legal details.

## Component Plan

Likely new/rebuilt components:

- `hero-section`
- `proof-strip`
- `audience-section`
- `product-story-section`
- `product-ui-frame`
- `workflow-table`
- `metric-card`
- `feature-narrative`
- `testimonial-section`
- `pricing-section` revised
- `site-footer` refined

Existing components that may be reused or revised:

- `site-header.tsx`
- `site-footer.tsx`
- `pricing-section.tsx`
- `team-grid.tsx`
- `blog-preview.tsx`

Existing components likely to replace or consolidate:

- `product-demo-stage.tsx`
- `features-grid.tsx`
- `feature-demos.tsx`
- `fitness-feature-section.tsx`
- `app-showcase.tsx`

## Build Phases

### Phase 0: Documentation And State

Status: in progress

Deliverables:

- Content backup.
- Rebuild brief.
- Style guide.
- Redesign plan.
- Redesign state file.

### Phase 1: Homepage Design System

Goal:

Create the new visual foundation.

Tasks:

- Decide final section flow.
- Define global colors/background/grid treatment.
- Build first hero/product preview.
- Build reusable cards, metric blocks, and product UI frames.

### Phase 2: Homepage Product Story

Goal:

Build the core homepage sections.

Tasks:

- Planning/attendance section.
- Bodystats/readiness section.
- Fitness analytics section.
- Integrations/erg section.
- Club overview section.

### Phase 3: Conversion Sections

Goal:

Complete credibility and conversion.

Tasks:

- Proof/integrations strip.
- Testimonials.
- Comparison.
- Pricing.
- Final CTA.

### Phase 4: Secondary Pages

Goal:

Bring remaining pages into the new design system.

Tasks:

- Contact.
- Blog index.
- Blog detail.
- Privacy policy.
- Terms and conditions.

### Phase 5: Cleanup And Verification

Goal:

Remove old unused code and verify the site.

Tasks:

- Delete unused components.
- Remove obsolete CSS.
- Run lint/build.
- Start local dev server.
- Inspect homepage in browser.
- Check desktop/mobile layouts.

## Open Questions

- Are testimonials real and approved?
- Are proof points current?
- Are pricing values final?
- Should Strava and Concept2 be shown only as integrations?
- Which rowing images should be used for the new hero and product sections?
- Should the initial redesign use mocked product UI or real app screenshots?

