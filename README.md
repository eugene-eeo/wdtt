# wdtt

What does twitter think? A tiny little tool to keep you informed on
what twitter thinks about some keywords. You don't need it. But you
want it. As it stands the UI and features are complete. I don't find
myself needing anything more from it, so what remains will probably
just be performance improvements or codebase cleanups.

![screenshot](images/screenshot.png)

(Looks best on Source Code Pro with 10pt font).

You need to set some environment variables beforehan; refer to the
Twitter API docs here: https://dev.twitter.com/ on where you could
get the tokens.

 - `CONSUMER_KEY`
 - `CONSUMER_SECRET`
 - `ACCESS_TOKEN`
 - `ACCESS_SECRET`

Features:

 - Opinionated design.
 - Optimised for long sessions.
 - Sparklines (everybody needs some).
 - Sentiment analysis.
 - No colors.

TODO:

 - Test more of the codebase.
 - UI tests (how to test a TUI?)
 - Client-server architecture?
 - Trends using count-min-skip?
 - Overengineered sparkline.
