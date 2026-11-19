# OOP Track

**Do the language track first.** Modules 08 (closures), 10 (errors) and 12 (`this`) matter most here. The DSA track is optional before this one, but you've already met classes there (`Stack`, `LinkedList`, `MinHeap`).

Object-oriented programming is a way of organising code around **objects that own their data and expose behaviour**. In JS, classes are mostly nicer syntax over **prototypes**, and you'll see both. The goal of this track isn't to put everything in classes. It's to know *when* bundling data with behaviour helps, and to recognise the patterns you'll meet in real codebases.

About 40% of the tests are `it.todo`, and in the capstone it's more.

## Modules

| # | Module | You'll build | Key idea |
|---|---|---|---|
| 01 | [Classes](01-classes/README.md) | Point, Temperature, BankAccount | constructors, methods, getters/setters, static |
| 02 | [Encapsulation](02-encapsulation/README.md) | Counter, User, Money, Thermostat | `#private`, invariants, immutability |
| 03 | [Prototypes](03-prototypes/README.md) | myNew, myInstanceOf, extend, createAnimal | what `class` and `new` actually do |
| 04 | [Inheritance](04-inheritance/README.md) | Shape → Circle/Rectangle/Square, Employee → Manager, HttpError family | `extends`, `super`, overriding |
| 05 | [Polymorphism](05-polymorphism/README.md) | totalArea, document nodes, Money v2, duck typing | one interface, many implementations |
| 06 | [Composition](06-composition/README.md) | mixins, robot dog, OrderService with injected deps | composition over inheritance; dependency injection |
| 07 | [Design Patterns](07-patterns/README.md) | EventEmitter, Strategy, Command (undo), Decorator, State machine | named solutions to recurring problems |
| 08 | [Capstone: Library](08-capstone/README.md) | a small library system | putting it all together |

## The four pillars, in one sentence each

- **Encapsulation:** an object hides its internal state and only allows changes through methods that keep it valid.
- **Abstraction:** callers use *what* an object does (`account.withdraw(10)`), not *how* it does it.
- **Inheritance:** a class can extend another and reuse or override its behaviour. Useful, and easy to overuse.
- **Polymorphism:** different objects respond to the same method call in their own way, so calling code doesn't need `if (type === ...)` branches.
