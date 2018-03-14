---
---
# 2. Animation, Movement, and User Input

## 2.1 Introduction to Animated Movement (in BASIC, Pascal and Python)

Simulating a moving object on a screen assumes that we are keeping track of where it is at each "instant". Suppose that the object has already been drawn at some initial position. Then visual movement is achieved with a "loop" that cycles through the following operations repeatedly:

* Erase the object's image at its current position
* Update the object's position
* Draw the object in its new position
* Pause for a time, depending on the desired speed of movement

Normally the object's position will be stored as x- and y-coordinates, and often the movement will be expressed in terms of _velocities_ in the x- (horizontal) and y- (vertical) directions. Suppose, for example, that we start off with the object 100 units from the left of the canvas and 700 units from the top (so x-coordinate 100 and y-coordinate 700); we refer to this as position (100, 700). (Note that in computer graphics, the y-axis points _downwards_ rather than upwards as in conventional mathematics.) Then suppose we want the object to move to position (900, 300) over 100 steps, so that the x-coordinate (let's call this `x`) increases by 8 each step, and the y-coordinate (call this `y`) decreases by 4 each time. Our loop now looks something like this:

* Start by making `x` equal to 100, and `y` equal to 700
* Repeat 100 times:
  * Erase the object's image at position (`x`, `y`)
  * Add 8 to `x`; subtract 4 from `y`
  * Draw the object at position (`x`, `y`)
  * Pause for a time, depending on the desired speed of movement

This should work, but the movement is likely to appear "flickery" because the object is being repeatedly erased and drawn again. To deal with this problem, the display can be "frozen" (by preventing screen updates) before the erasing takes place, and then "unfrozen" (by re-enabling screen updates) after the object has been redrawn. This makes the redrawing almost simultaneous with the erasing, so the object won't seem to disappear at all. Expressed in the language Turtle Python, using a red circular _blot_ of radius 50 as the object (so drawing a white blot in the same position erases it), and with a pause each cycle of 10 milliseconds (ms), all this comes out as follows:

```python
x = 100
y = 700
for count in range(0, 100, 1):
  noupdate()
  colour(white)
  blot(50)
  x = x + 8
  y = y - 4
  setxy(x, y)
  colour(red)
  blot(50)
  update()
  pause(10)
```

The Turtle BASIC version is very similar, but the command words are all capitalised, and the variable names -- `x%`, `y%` and `count%` -- have to end in `%` to indicate that they are integer variables (whereas string variables end in `$`). BASIC also expresses the loop a bit differently:

```basic
FOR count% = 1 TO 100
  NOUPDATE
  ...
  PAUSE(10)
NEXT
```

The Turtle Pascal version uses the same command and variable names as Turtle Python (although capitals can be used if preferred, because in Pascal, `PAUSE` and `pause` are treated as identical). But the loop is expressed differently again, and Pascal requires that the variables be "declared" as integers in advance. Note also that in Pascal, variable assignment is expressed using `:=` (rather than `=`), and as we saw earlier, semicolons are used to separate the different _commands_ (but are not _needed_ immediately before words that act as algorithmic _brackets_, like `end` and `until`):

```pascal
var x, y, count: integer;
...
x := 100;
y := 700;
for count := 1 to 100 do
  begin
    noupdate;
    ...
    x := x + 8;
    y := y - 4;
    ...
    pause(10)
  end;
```

> This complete program -- called [MovingBall](https://www.turtle.ox.ac.uk/online/example/MovingBall) -- can be found in the Help menu of each language. If you use the _Online Turtle System_ that runs within a web browser, you may notice that the white erasing blots are there set a bit bigger than the red blots, because browsers use _anti-aliasing_ to give a smoother appearance, making the red colouring spread beyond the strict blot radius.

## 2.2 Acceleration and Bouncing

In the example above, the red "ball" moves a constant amount between loop cycles: its x-coordinate increases by 8, and its y-coordinate decreases by 4. So the ball has a velocity in the x-direction of +8 units per cycle, and a velocity in the y-direction of -4 units per cycle. To make the example more easily flexible, we could create variables `xvel` and `yvel` (or in BASIC, `xvel%` and `yvel%`) to represent these velocities. Then these two assignments would be added to the Pascal version above:

```pascal
xvel := 8;
yvel := -4;
```

while the looping changes to the x- and y-coordinates would become:

```pascal
x := x + xvel;
y := y + yvel;
```

Having done this, we can now accelerate (or decelerate) the ball by changing the values of `xvel` and `yvel`. For example, if `xvel` is made equal to 16, the horizontal movement will be twice as fast, and if `yvel` is made equal to 0, the ball will stop rising and instead move only horizontally.

We can also make the ball "bounce" by inverting the velocities when the ball overlaps the relevant edge of the canvas (e.g. by changing `xvel` from +8 to -8, or `yvel` from -4 to +4). Since the ball has a radius of 50 units, and the default canvas coordinates range from 0 to 999 inclusive, this bouncing should be made to happen when either `x` or `y` is less than 50, or greater than 949. We achieve this using two simple `if` statements, as follows:

BASIC:

```basic
IF (x% < 50) OR (x% > 949) THEN xvel% = -xvel%
IF (y% < 50) OR (y% > 949) THEN yvel% = -yvel%
```

Pascal:

```pascal
if (x < 50) or (x > 949) then
  xvel := -xvel;
if (y < 50) or (y > 949) then
  yvel := -yvel;
```

Python:

```python
if (x < 50) or (x > 949):
  xvel = -xvel
if (y < 50) or (y > 949):
  yvel = -yvel
```

Now instead of limiting the ball's movement to 100 steps (using the `for` loop), we can allow it to continue indefinitely, knowing that it will never leave the canvas because it will always bounce back from the edges. One way of doing this is to put the movement into a `while` loop whose condition -- here `0 < 1` -- remains true eternally:

BASIC:

```basic
WHILE 0 < 1
  ...
ENDWHILE
```

Pascal:

```pascal
while 0 < 1 do
  begin
    ...
  end;
```

Python:

```python
while 0 < 1:
  ...
```

> This complete program -- called [BouncingBall](https://www.turtle.ox.ac.uk/online/example/BouncingBall) -- can be found in the Help menu of each language.

Turtle BASIC and Turtle Pascal also provide another way of going on forever, using a `repeat` loop with an impossible condition (e.g. `REPEAT ... UNTIL 0 = 1`).

## 2.3 Taking Advantage of the Turtle Coordinates

In the examples above, we used variables `x` and `y` (or `x%` and `y%` in BASIC) to record the current coordinates of the moving object. But if we are dealing with just one object, then we can instead take advantage of the _turtle_'s inbuilt variables `turtx` and `turty` (or `TURTX%` and `TURTY%` in BASIC) to do this work for us. If we draw the object only at the position of the _turtle_, and accordingly move the _turtle_ where we want the object to go, then `turtx` and `turty` will automatically be updated as we move around, enabling our program to be shorter. The original Turtle Python commands:

```python
x = 100
y = 700
```

can then be replaced by:

```python
setxy(100, 700)
```

which sets `turtx` to 100, and `turty` to 700. In a similar way, the three commands:

```python
x = x + 8
y = y - 4
setxy(x, y)
```

can be replaced by the single line:

```python
movexy(8, -4)
```

which adds 8 to the _turtle_'s x-coordinate `turtx`, subtracts 4 from the _turtle_'s y-coordinate `turty`, and thus moves the _turtle_ to that position for the ball to be drawn there (note that `movexy` differs from `drawxy`, which draws a line as the _turtle_ moves but is otherwise similar).

In Turtle Pascal, the commands are identical, but need to be followed by semicolons as usual. The Turtle BASIC equivalents are `SETXY(100, 700)` and `MOVEXY(8, -4)`.

> Appropriately modified versions of the earlier programs ([MovingBall](https://www.turtle.ox.ac.uk/online/example/MovingBall) and [BouncingBall](https://www.turtle.ox.ac.uk/online/example/BouncingBall)) using the _turtle_ to execute movements -- called [TurtleMove](https://www.turtle.ox.ac.uk/online/example/TurtleMove) and [TurtleBounce](https://www.turtle.ox.ac.uk/online/example/TurtleBounce) -- can be found in the Help menu of each language.

## 2.4 Mouse and Keyboard Input

Before moving on to the main chapters, let us see how user input can be incorporated into running programs, since this will feature at various points later and be used quite generally to make your programs more interesting (e.g. by incorporating real-time user controls). _Turtle_ provides quite powerful facilities for input, falling into three main categories, concerned with capturing:

* Keyboard typed input
* Key presses
* Mouse movements and mouse clicks

Note the distinction between the first two of these: one involves the _characters_ that are typed in from the keyboard (taking account of lower/upper case etc.), while the other involves the _physical key presses_. When typing takes place, typically _both_ types of input are recorded simultaneously.

### 2.4.1 Keyboard Typed Input

When keys are pressed while a program is running, the typed characters are put into a _keyboard buffer_ which stores them for later reading. This means that you don't need to write code to read them one by one as they are typed, which would be tricky and cumbersome. The keyboard buffer has a default length of 32, meaning that if you type 32 characters without reading any of them in the meantime, then no more characters will be accepted (and the machine will emit a beep as you type them). The integer function `keystatus(\keybuffer)` -- or `KEYSTATUS(\KEYBUFFER)` in BASIC -- can be used to discover how many characters are currently in the keyboard buffer, while the procedure `reset(\keybuffer)` -- `RESET(\KEYBUFFER)` in BASIC -- empties the buffer completely.

Reading strings of characters from the keyboard buffer is done using two string functions, the first of which is called `read` in Pascal and Python, and `GET$` in BASIC. This takes a numerical parameter and returns a string, so its use is typically of the following form:

BASIC:

```basic
s$ = GET$(10)
```

Pascal:

```pascal
s := read(10);
```

Python:

```python
s = read(10)
```

This command reads up to 10 characters from the keyboard buffer (thus removing them from the buffer and freeing up space in it), and assigns them to the relevant string variable (`s` or `s$`). Thus if the user previously typed only "Hello", then after the command executes, the variable's value will be "Hello" and the keyboard buffer will be empty, but if the user previously typed "Hello there, how are you?", then the variable's value will now be "Hello ther" (10 characters, including a space) and the keyboard buffer will be left containing "e, how are you?".

The second function is called `readln` in Pascal, `readline` in Python, and `GETLINE$` in BASIC, and is simpler, taking no parameter:

BASIC:

```basic
s$ = GETLINE$
```

Pascal:

```pascal
s := readln;
```

Python:

```python
s = readline
```

This reads characters from the keyboard buffer _until it encounters an end-of-line_ character, and then assigns the corresponding string to the relevant variable (discarding the end-of-line character, which does not become part of the string variable's value). If no end-of-line has been typed yet -- i.e. the <kbd>Return</kbd> or <kbd>Enter</kbd> key has not been pressed -- then the command will wait until <kbd>Return</kbd> or <kbd>Enter</kbd> has been pressed, so this makes it very easy to ask for typed input in your programs. (While waiting for the end-of-line, other typed characters are taken from the keyboard buffer, so the buffer is continuously emptied and its limit of 32 characters does not limit the length of the typed-in string.)

> For a very simple illustration of this, see the example program [Asking for typed input](https://www.turtle.ox.ac.uk/online/example/AskInput) in the Help menu of each language.

### 2.4.2 Key Presses

While any program is running, details of _the latest key press_ are recorded continuously, and this information can be consulted using the special "query" functions `?key` and `?kshift` (`?KEY` and `?KSHIFT` in BASIC), both of which return integer values. Thus for example:

BASIC:

```basic
n% = ?KEY
```

Pascal:

```pascal
n := ?key;
```

Python:

```python
n = ?key()
```

will make `n` (or `n%`) equal to the relevant key value. If the <kbd>A</kbd> key is currently being pressed, then `n` will be made equal to 65 (the ASCII code for 'A'); but if the <kbd>A</kbd> key has just been released (with no other key being pressed in the meantime), then `?key` will have been negated so that `n` will be -65. In this way, `?key` can be used both to identify the last key press, and also whether that press is still continuing. To make identification easier, _Turtle_ provides built-in keycode constants, including `\a` (65) to `\z` (90), likewise for the digit keys (e.g. `\4`, or `\#4` on a numeric keypad) and other standard character keys (e.g. `\=`), and for the special keys: `\alt`, `\backspace`, `\capslock`, `\ctrl`, `\delete`, `\down`, `\end`, `\escape`, `\f1` (etc.), `\home`, `\insert`, `\left`, `\lwin`, `\pgdn`, `\pgup`, `\return`, `\right`, `\rwin`, `\shift`, `\space`, `\tab`, and `\up` (or upper-case equivalents in BASIC). Thus to do something repeatedly until the <kbd>Escape</kbd> key has been pressed -- irrespective of whether that key is then immediately released -- it is simplest to use a loop whose test incorporates the `abs` function (meaning absolute value, e.g. `abs(-65) = 65`):

BASIC:

```basic
REPEAT
  ...
UNTIL ABS(?KEY) = \ESCAPE
```

Pascal:

```pascal
repeat
  ...
until abs(?key) = \escape
```

Python:

```python
while (abs(?key) != \escape):
  ...
```

Whenever a key is pressed, its "shift status" is recorded as a single number, which is calculated as 128 plus 8 if the <kbd>Shift</kbd> key was being held down at the time, plus 16 if <kbd>Alt</kbd> was held down, plus 32 if <kbd>Ctrl</kbd> was held down. Thus if the last key was pressed with <kbd>Ctrl</kbd> and <kbd>Alt</kbd> both held down, then `?kshift` will return the value 128+16+32 = 176 (at least while the key is still pressed; again this goes negative, to -176, if called after the key has been released). This value is also recorded separately for each key, so that `keystatus(\a)`, for example, will return the corresponding value for the last press of the <kbd>A</kbd> key (even if other keys have been pressed in the meantime). Much as with the keyboard buffer (in the previous section), `reset(\a)` puts the `keystatus` of the <kbd>A</kbd> key back to its default setting (here -1). More detail on all of this is given in the built-in "User Input" help panel (within _Turtle_'s "Help1" tab).

### 2.4.3 Mouse Movements and Mouse Clicks

While a program is running, _Turtle_ continuously keeps track of the position of the mouse over the Canvas, with the x- and y-coordinates being given by the integer functions `?mousex` and `?mousey` respectively (`?MOUSEX` and `?MOUSEY` in BASIC). Likewise, when a mouse click takes place, the x- and y-coordinates of the click position are given by the integer functions `?clickx` and `?clicky` (`?CLICKX` and `?CLICKY` in BASIC). Rather like the function `?kshift` (which, as we saw in the previous section, records the status of the last key press), so `?click` records the status of the last mouse click, calculated as 128 plus 1 for a left-click, 2 for a right-click, 4 for a middle-click, 8 if <kbd>Shift</kbd> was held down, 16 if <kbd>Alt</kbd> was held down, 32 if <kbd>Ctrl</kbd> was held down, and 64 if it was a double-click (and again as with key presses, `?click` is made negative when the click event finishes). But often a more convenient way of checking for a specific mouse click is to use the functions `?lmouse`, `?rmouse` and `?mmouse` (`?LMOUSE`, `?RMOUSE` and `?MMOUSE` in BASIC), which return the status for the latest click with the corresponding mouse button (left, right, and middle respectively). Thus, for example, a loop like this will wait until the left mouse button _is actually being clicked_:

BASIC:

```basic
REPEAT
UNTIL ?LMOUSE > 0
```

Pascal:

```pascal
repeat
until ?lmouse > 0;
```

Python:

```python
while (?lmouse <= 0):
  # do nothing
```

If, on the other hand, you want a loop to terminate _after_ the left mouse button has been clicked, whether or not it is still being held down, you could use:

BASIC:

```basic
RESET(?LMOUSE);
REPEAT
  ...
UNTIL ABS(?LMOUSE) > 128
```

Pascal:

```pascal
reset(?lmouse);
repeat
  ...
until abs(?lmouse) > 128
```

Python:

```python
reset(?lmouse)
while abs(?lmouse <= 128):
   ...
```

The command `reset(?lmouse)` sets the left-mouse status to -1. When that mouse button is clicked, the status value will change to 129 (assuming an ordinary click with no <kbd>Shift</kbd> etc.), and when it is released, to -129. Hence looping until it achieves an absolute value greater than 128 does the trick.

> So far, examples have been given in BASIC, Pascal and Python, to make clear that all three languages are usable within the _Turtle_ system, and fundamentally very similar: _it really does not matter which language you use for learning, since the computational thinking skills are so easily transferable_. Examples are provided online in all three languages, and the explanations in this book apply equally to all three. But in the remaining chapters, it is obviously far more efficient, and will minimise risk of confusion, if we mainly stick to one programming syntax, and we shall use Pascal syntax (as commonly used in Computer Science textbooks) rather than BASIC or Python. This avoids the capitalisation of BASIC, is mostly similar in form to Python, but is explicit about variable usage (since all Pascal variables are declared, unlike BASIC and Python). Pascal also enables code to be quoted inline without indentation (which is crucial in Python), and allows us to use the `=` sign unambiguously, in both mathematical explanation and program code, to mean _equality_ rather than variable _assignment_.
