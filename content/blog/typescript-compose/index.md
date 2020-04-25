---
title: Compose<Function>
date: '2020-04-25T19:09:59.546Z'
spoiler: How 2 SRS?
keywords: ['programming']
---

I am far from the first person to say this: learning via Spaced Repetition System (SRS) feels like magic.

SRS refers to a learning technique that typically involves flashcards. It's been around since the sixties, but modern incarnations usually involve software (surprise!). One popular free web and iOS app, [Anki](https://ankiweb.net), allows users to build decks of flashcards and respond to the questions they've written. The feature that makes it so effective? The app decides what material needs to be reviewed, and when. From our friend [Wikipedia](https://en.wikipedia.org/wiki/Spaced_repetition):

> Newly introduced and more difficult flashcards are shown more frequently while older and less difficult flashcards are shown less frequently in order to exploit the psychological spacing effect.

The "psychological spacing effect" is basically the corollary of the cliché about how you won't be able to remember anything if you study by "cramming", bolstered by [science](https://journals.sagepub.com/doi/abs/10.1177/1745691616645770?icid=int.sj-abstract.similar-articles.3&journalCode=ppsa): reviewing learning materials at spaced intervals over time increases retention.

## /SRS.(rb|js|rs)/

Using SRS to learn programming languages is something I've experimented with off and on since I started learning Ruby in 2014. I recently made my second attempt when I created a few hundred Anki flashcards from [The Rust Book](https://doc.rust-lang.org/book/). The process of creating the study materials is labour-intensive, but the technique is so effective that I've found it's worth it.

## excuteprogram.com

When I recently came across a Gary Bernhardt tweet about a new project of his, [executeprogram.com](https://executeprogram.com)...

```ts
✓ > const squaredPlusOne =
      compose<number>(n => n + 1, n => n * n)

squaredPlusOne(5)

Expected: 26 OK!
```

```ts
✓ > const downcasedPosessive =
      compose<string>(s => s.toLowerCase(), s => s + "'s")

downcasedPosessive('AMIR')

Expected: 'amir\'s' OK!
```

```ts
✓ > const downcasedPosessive =
      compose<number>(s => s.toLowerCase(), s => s + "'s")

downcasedPosessive('BETTY')

Expected: type error OK!
```

```ts
function compose<A>(f: (arg: A) => A, g: (arg: A) => A): (arg: A) => A {
  return (x) => f(g(x));
}
```
