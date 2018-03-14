---
---
# 4. Cellular Automata: Modelling Disease, "Life", and Shell Patterns

Cellular automata provide a powerful and relatively straightforward way of modelling many different phenomena, from crystal growth to biological patterning, and from chemical dynamics to social interaction. They can also be fun and even quite exciting!

## 4.1 Introduction to Cellular Automata, and Pixel Manipulation

A cellular automaton is a grid of _cells_, typically in a square array, each of which is in a particular _state_ at any given moment. Initially, these states might be assigned randomly or in some pattern, but then as time "ticks" from moment to moment, the state of each cell may change, usually by following simple _rules_ that determine the new state according to the arrangement of states across the neighbouring cells. Some cellular automata are _asynchronous_, with individual cells being processed one by one -- we see a simple example in the next section. Others are _synchronous_, with all cells being processed simultaneously, so that with each tick of the clock, we get a new _generation_ of cell states, each of which has been individually determined by the same simple rules applied (within its neighbourhood) to the previous generation of states. Surprisingly elaborate changing patterns can emerge from even very simple rules, as we shall see with the famous "Game of Life".

When implementing cellular automata within _Turtle_, it often makes sense to change the resolution of the canvas image (as well as the virtual canvas dimensions) so that each cell corresponds to a single "pixel" (as well as a single coordinate location). Then the cell's colour can easily be set using the `pixset` command, as in the following simple Turtle Pascal program ([LifeStart](https://www.turtle.ox.ac.uk/online/example/LifeStart)) which creates an initial setup for the Game of Life -- an example result is shown in the image.

```pascal
PROGRAM LifeStart;
CONST width=32;
      height=32;
VAR x,y: integer;
BEGIN
  canvas(0,0,width,height);
  resolution(width,height);
  for x := 0 to width-1 do
    for y := 0 to height-1 do
      if random(7)=0 then
        pixset(x,y,black)
      else
        pixset(x,y,white)
END.
```

![](/assets/img/gameoflife.png)

Use of the two constants `width` and `height` -- both here set to 32 -- makes this code very easily adaptable for different sizes of board, just by setting the constants to different values. The `canvas` command then specifies the relevant coordinate range (i.e. 0 to 31 along both axes) and the `resolution` command fixes the corresponding image size (i.e. 32×32 pixels). Then the two variables `x` and `y` are used to count through all the cells in turn, randomly making roughly one in seven of them _black_ and the rest _white_ (though in fact there would be no need to set the latter, because _white_ is the default colour). And just as the pixels' colour can be set with the `pixset` command, so the `pixcol` function can be used to read that colour, e.g. `thiscol := pixcol(x,y)`. As we shall see, this makes it possible to use the pixel colour itself to record the state of each cell.

## 4.2 Modelling the Spread of Disease, and Its Prevention

Before tackling the complexities of the Game of Life, it will be helpful to start with a much simpler cellular automaton, and one which -- somewhat ironically -- is far more closely related to _real_ life! The [Disease](https://www.turtle.ox.ac.uk/online/example/Disease) example program is an implementation of the famous "SIR" (Susceptible, Infected, Recovered) model of the spread of infectious disease, and conveys some very important practical lessons about disease prevention. The program begins by defining various constants:

1. Canvas dimensions `width` and `height` (both 100 in this case).
2. Colours to indicate cells that are `susceptible` (`lightgreen`), `infected` (`red`), and `recovered` (`blue`).
3. An integer `startradius` (10) that defines the maximum boundary of the initial infection.
4. Three probabilities, each of which is to be interpreted as a percentage: `infectprob` (1%), the probability that a cell within `startradius` will be initially infected; `immuneprob` (2%), the probability that a cell will be immune throughout (e.g. due to prior inoculation); and `recoverprob` (15%), the probability that an infected cell will recover in any time period.

As before, the point of defining these constants (rather than using the numbers directly in the code) is to make them very easy to change, so you can experiment with different values. The whole point of this program, indeed, is to see how the behaviour then changes.

Following the constants and a few variables -- including `numinfected`, which keeps count of infected cells -- there is a simple procedure `infect(x,y)`, which colours cell `(x,y)` with the `infected` colour (i.e. `red`) and increments `numinfected` accordingly. Then the main program begins, defining the canvas and resolution (just as we saw above), initialising `numinfected` to zero, and colouring the cells of the canvas according to the following rules:

* If a cell's distance from the centre of the canvas is less than or equal to `startradius` (10), then with probability `infectprob` (1%), it will be `infected` (`red`) from the start.
* Otherwise, with probability `immuneprob` (2%), the cell will be `recovered` (`blue`) from the start -- this colour is given to cells that are immune, mostly after recovery from the infection.
* Otherwise, the cell will be `susceptible` (`lightgreen`).

The canvas is temporarily frozen (using `noupdate` ... `update`) while this colouring is taking place, so it can be completed much more quickly.

Having finished this initialisation, the spread and eventual decline of the infection are modelled with a loop that continues until `numinfected` becomes zero. The loop starts by choosing a random value of `x` between 0 and (`width-1`) and a random value of `y` between 0 and (`height-1`). Then we check the colour of cell `(x,y)` to see whether it is `infected` (i.e. `red`) or not. If it is, then with probability `recoverprob` (15%), we change it to `recovered` (i.e. `blue`), to indicate that it has now recovered and thus become immune from further infection. (To do this with the correct probability, we use the conditional `if random(100)<recoverprob` to select a random number between 0 and 99 and check whether it is less than `recoverprob`.) Finally, if the cell is infected and has _not_ recovered, then the following code is executed:

```pascal
n:=random(4)*2+1;
x:=x+n div 3-1;
y:=y+n mod 3-1;
if pixcol(x,y)=susceptible then
  infect(x,y);
```

The purpose of this code is to select at random one of the four closest neighbours of the infected cell and then, if that cell is `susceptible` (i.e. `lightgreen`), to infect it -- this is how the infection spreads. The arithmetic here is neat but a bit tricky, going through the following steps and using the operators for integer division (`div`) and remainder (`mod`):

| `random(4)` | `random(4)*2` | `n` | `n div 3` | `n div 3 -- 1` | `n mod 3` | `n mod 3 -- 1` |
| ----------- | ------------- | --- | --------- | ------------- | --------- | ------------- |
| 0           | 0             | 1   | 0         | -1            | 1         | 0             |
| 1           | 2             | 3   | 1         | 0             | 0         | -1            |
| 2           | 4             | 5   | 1         | 0             | 2         | 1             |
| 3           | 6             | 7   | 2         | 1             | 1         | 0             |

The first, fifth, and last columns show the four possible random numbers (between 0 and 3), and the corresponding values that get added to `x` and `y` respectively. Adding `(-1,0)` corresponds to a move left on the canvas, `(0,-1)` to a move up, `(0,1)` to a move down, and `(1,0)` to a move right. So after these additions, the coordinates `(x,y)` do indeed identify one of the four neighbouring cells. Now it just remains to test whether that cell is `susceptible` (`lightgreen`), and if it is, to infect it (`red`).

> You might have noticed that moving in these ways from a cell on the edge of the grid could take us to a pixel off the canvas. One convenient feature of `pixset` and `pixcol` -- unlike corresponding operations with arrays -- is that they do not throw up an error message if this happens, and since it causes no trouble for the operation of our program, we are able to ignore this complication here. But an inquisitive student might want to investigate whether changing the colours _could_ introduce a problem …

![](/assets/ims/disease.png)

One practical virtue of this model of infection -- which in its more sophisticated forms is highly influential and widely used -- is to demonstrate very clearly the value of inoculation. If the program is run as it stands, the infection is very likely to spread from the centre of the canvas to most of the susceptible cells (the image above shows it spreading aggressively in several directions). But if the value of `immuneprob` is set higher -- for example, changed from 2% to 12% -- then you will find that the infection has far less impact, often dying out quickly and usually reaching only a small proportion of the canvas. Thus artificially inoculating even 10% of the population can potentially bring a huge payoff in disease control for the population as a whole. Real diseases, of course, will vary in infectivity and other characteristics, so we cannot assume that this conclusion will apply to them. But this model does allow for variation, and enables us to explore how the critical value of `immuneprob` at which the disease can be tamed depends on the probability of recovery in each time period: if recovery typically takes a long time (because `recoverprob` is low), then more widespread prior immunity will be required to keep the disease in check. The crucial point here is that the longer recovery takes for any individual, the more opportunity the disease has to infect that individual's neighbours, and so the higher the probability that it will indeed be passed on to them.

This particular population structure -- which assumes that every individual is statically located within a fixed grid, with precisely four neighbours each -- is of course very crude, but more complex versions of the "SIR" model play a vitally important role in the real world, helping _epidemiologists_ (those who study such things) to understand, predict and combat the spread of diseases. In the mathematics of infection, the most important parameter for any disease is its "basic reproduction number" (commonly denoted $$R_0$$) -- that is, the number of individuals that could be expected, on average, to be directly infected from one newly-infected individual within a totally susceptible population. In our model (with `recoverprob` at 15%), this parameter is around 2.35 for an individual surrounded by four "susceptibles", but of course any individual thus infected will then have only three adjacent susceptibles (since the individual who infected them is no longer susceptible), and their expected direct infectivity drops accordingly, to around 1.76. An interesting experiment would be to see what happens if individuals are allowed to wander (e.g. perhaps by incorporating the sort of "diffusion" modelled in the next chapter), in which case the spread of disease is likely to be significantly greater. In general, if a population is "well mixed", then an infection is likely to become an epidemic if its numbers systematically grow, i.e. if $$R_0$$ is greater than 1.

## 4.3 The Game of Life

The most famous cellular automaton, and one of the most fascinating, is John Conway's _Game of Life_. This involves a square grid of cells -- potentially extending for ever in all directions -- within which each cell can be either _alive_ or _dead_ (so there are just two possible cell states). Since an infinite grid is impractical, most computer implementations involve instead a finite square grid, e.g. 50×50, with the edges "wrapping around" (so the right-hand column is treated as being adjacent to the left-hand column, and the bottom row adjacent to the top row). Within this grid, live cells are usually shown black, and dead cells white -- the initial arrangement of these black and white cells may be set randomly (e.g. perhaps as we saw earlier, with a 1 in 7 chance of each cell being alive).

<table>
  <tbody>
    <tr><td>1</td><td>2</td><td>3</td></tr>
    <tr><td>8</td><td></td><td>4</td></tr>
    <tr><td>7</td><td>6</td><td>5</td></tr>
  </tbody>
</table>

Within any such grid, we consider each cell as having 8 _neighbour_ cells, as shown in the table above. (This differs from the disease model above, in which we treated only cells 2, 4, 6, and 8 as neighbours. These are the two most common options, but many models adopt yet other definitions of "neighbourhood".) What happens to each cell then depends on whether it is alive or dead, and how many of its neighbours are alive or dead. From one generation to the next:

* A cell that is currently alive will stay alive in the next generation _if, and only if_, it currently has exactly 2 or 3 live neighbours. Otherwise, it dies.
* A cell that is currently dead will become alive in the next generation _if, and only if,_ it currently has exactly 3 live neighbours. Otherwise, it stays dead.

Though simple, however, these rules can be tricky to implement, because of the need to perform them on all cells simultaneously. If _A_ and _B_ are neighbouring cells and we deal with _A_ first, then if _A_'s state changes as a result, this risks messing up the calculation for _B_, whose next state should be determined (in part) by _A_'s _current_ state, not by _A_'s _next_ state. The upshot is that we need to be able to retain in memory _both_ the current state of each cell, _and_ the newly-calculated state that will take over in the next generation.

## 4.4 Colour Codes, Binary Numbers, and Bitwise Operators

Just as with our earlier model of disease, so in the Game of Life there is no need to keep a separate record of whether each cell is alive or dead -- the pixels store that information already and can be manipulated individually using `pixset` and `pixcol`. And in fact the pixels can store far more information that this, because each pixel holds a three-byte _RGB_ colour code, in which the _most significant byte_ (i.e. the one written first, which has the biggest impact on the overall size of the hexadecimal number) represents the intensity of red, the middle byte the intensity of green, and the _least significant byte_ the intensity of blue (this is exactly the same colour coding method that is used in web pages). Thus for example the colour `emerald` has colour code `#00C957`, with `#` indicating that the number is _hexadecimal_ (base 16), so that the red component is `#00` (zero), the green component is `#C9` (12×16 + 9 = 201 in decimal), and the blue component is `#57` (5×16 + 7 = 87 in decimal). Since the maximum possible value for any component is `#FF` (15×16 + 15 = 255 in decimal), we can see that `emerald` is overall mostly green, mixed with some blue.

To get hold of the individual bits and bytes of colour codes (or any other number), we need to understand how they are stored within the computer as _binary_ (base 2). Consider again the code for `emerald`, divided into hexadecimal digits, each of these corresponding to a 4-bit chunk or _nybble_:

<table>
  <tbody>
    <tr><th>Hexadecimal (#)</th><td>0</td><td>0</td><td>C</td><td>9</td><td>5</td><td>7</td></tr>
    <tr><th>Binary</th><td>0000</td><td>0000</td><td>1100</td><td>1001</td><td>0101</td><td>0111</td></tr>
  </tbody>
</table>

The four binary digits of each nybble count for 8, 4, 2, and 1 respectively, and we call this their _place value_ (in our familiar decimal system, of course, the place values -- starting from the right -- are 1, 10, 100 etc.). Thus the binary number "1001" is equivalent to decimal "9" (8+1), "0111" to decimal "7" (4+2+1), "0101" to decimal "5" (4+1), and "1100" to decimal "12" (8+4). The highest possible value for a nybble is thus decimal "15" ("1111" = 8+4+2+1), so a nybble can take any value between 0 and 15, which enables it to be represented by a single _hexadecimal_ digit (just as any value between 0 and 9 can be represented by a single _decimal_ digit). Use of hexadecimal obviously requires that we have 16 different digits available, and that's why we go beyond "9" to use "A" as the hexadecimal digit for 10, "B" for 11, "C" for 12, "D" for 13, "E" for 14, and "F" for 15\. (In the table above, notice that the binary number "1100" -- value 8+4 -- corresponds to the hexadecimal digit "C".)

Once we understand binary numbers, we can make use of _bitwise operators_ to manipulate them. _Turtle_ provides four such standard operators, which are called:

<table>
  <tbody>
    <tr>
      <td><code>not</code></td>
      <td><code>and</code></td>
      <td><code>or</code></td>
      <td><code>xor</code></td>
      <td>(Pascal and Python)</td>
    </tr>
    <tr>
      <td><code>NOT</code></td>
      <td><code>AND</code></td>
      <td><code>OR</code></td>
      <td><code>EOR</code></td>
      <td>(BASIC)</td>
    </tr>
  </tbody>
</table>

The `not` operator inverts the bits of the integer to which it is applied, taking it to have 32 bits altogether (see the box in §3.3 above), rather than only the 24 bits that are taken into account in colour codes. Thus `not(0)`, for example, will give `#FFFFFFFF` in hexadecimal, all 1-bits in binary (which in the two's complement system -- also mentioned in the box in §3.3 above -- happens to represent the integer -1). The other three operators fix each bit in accordance with the following _truth-tables_:

> These truth-tables fit with the natural "logical" interpretation of the three operators, taking 0 as `false` and 1 as `true` (e.g. `A and B` comes out true only if both `A` and `B` are individually true). Hence in _Turtle_ these operators can be used both as "logical" connectives (connecting two statements) and "bitwise" operators (on two numbers).

| A | B | A and B |
| - | - | ------- |
| 1 | 1 | 1       |
| 1 | 0 | 0       |
| 0 | 1 | 0       |
| 0 | 0 | 0       |

| A | B | A or B |
| - | - | ------ |
| 1 | 1 | 1      |
| 1 | 0 | 1      |
| 0 | 1 | 1      |
| 0 | 0 | 0      |

| A | B | A xor B |
| - | - | ------- |
| 1 | 1 | 0       |
| 1 | 0 | 1       |
| 0 | 1 | 1       |
| 0 | 0 | 0       |

So if, for example, we apply these operators between the decimal numbers 21 (binary 00010101) and 9 (binary 00001001), we get:

00010101 (21) 00010101 (21) 00010101 (21)

00001001 (9) 00001001 (9) 00001001 (9)

_and:_ 00000001 (1) _or:_ 00011101 (29) _xor:_ 00011100 (28)

(21 _and_ 9) yields 1, because the only 1-bits in the result are those that were 1-bits in both of the original numbers. (21 _or_ 9) yields 29, because the only 0-bits in the result are those that were 0-bits in both of the original numbers. (21 _xor_ 9) yields 28, because the 1-bits in the result are those that were a 0-bit in one of the original numbers, and a 1-bit in the other.

Suppose now that we are given some six-digit hexadecimal colour code #RRGGBB and we want to get hold of the green component -- the middle 8 bits (2 nybbles). We can do this by _anding_ with the hexadecimal number #00FF00, which has all 1-bits in the middle byte and 0-bits elsewhere, and then dividing by #100 (i.e. 256 in decimal). Thus

(_emerald and_ #FF00) evaluates to #C900 (in hexadecimal)

((_emerald and_ #FF00) / #100) evaluates to #C9 (in hexadecimal, 201 in decimal).

If on the other hand we wish to add an element of red (say an intensity of 8/255) to _emerald_ (#00C957), then we can do this using the _or_ operator:

(_emerald or_ #80000) evaluates to #08C957

In this way, the _and_ operator can be used to discover which bits are "set" (i.e. are 1-bits) in the binary representation of a number, and the _or_ operator can be used to ensure that specific bits get set. The _xor_ operator is useful when we want to change a particular bit (from 0 to 1, or 1 to 0).

## 4.5 Life, Hiding in the Pixels

Let's now see how we can implement the Game of Life, storing all the intermediate information in the pixels. This incidentally provides a nice illustration of the techniques explained above, which can also be used for _steganography_, in which secrets are hidden in what look like ordinary pictures (which is a fun topic to be explored in future _Turtle_ materials).

So far, we have two colour codes in our Game of Life pixels, _black_ and _white_. Spelled out in binary, with all 24 colour bits represented by a digit, _black_ is "000000000000000000000000" and _white_ is "111111111111111111111111"; so it clearly makes life easier if we work in hexadecimal!

_black_ (live cells): #000000 -- zero intensity of red, green, and blue

_white_ (dead cells): #FFFFFF -- maximum intensity of red, green, and blue

_Every_ bit of _black_ is 0, and _every_ bit of _white_ is 1, but instead of using the entire number to indicate whether each cell is currently alive or dead, we could use just a single bit, for example the _least significant bit_ (the very last, whose place value is 1). And then we could use the next least significant bit (the second last, whose place value is 2) to indicate something quite different, namely, _whether the cell is going to change state in the next generation_. So now we can add two new colour codes:

_blackish_ (live but dying): #000002 (last byte is 00000010 in binary)

_whitish_ (dead but resurrecting): #FFFFFD (last byte is 11111101 in binary)

Visibly, _blackish_ will be indistinguishable from _black_, and _whitish_ will be indistinguishable from _white_. So we can store this information as we go along, without affecting how the canvas looks! Changing a code from _black_ to _blackish,_ or _white_ to _whitish_ -- or reversing such a change -- is easily done by xoring the code with the number 2, for example (_black xor_ 2) = _blackish_, and (_blackish xor_2) = _black_.

When calculating which cells are to die or be resurrected, we need to go through every cell in the grid, applying the rules we saw before:

*   A cell that is currently alive will stay alive in the next generation _if, and only if_, it currently has exactly 2 or 3 live neighbours. Otherwise, it dies.
*   A cell that is currently dead will become alive in the next generation _if, and only if,_ it currently has exactly 3 live neighbours. Otherwise, it stays dead.

Recall also that every cell has 8 neighbouring cells, even those on the edges of the grid, because the grid "wraps around" from left to right, and from top to bottom. Perhaps surprisingly, this wrapping around is very straightforward, because we can take advantage of the _mod_ operator (written "_MOD"_ in BASIC) which yields _remainders_ (e.g. 14 _mod_ 4 = 2, because 4 goes into 14 three times, with a remainder of 2). If we're concerned with cell (_x_,_y_) and use variable _dn_ to count "dead neighbours", then the code (in Pascal) might go like this:

var dn, i, j: integer;

...

dn := 0;

for i := -1 to 1 do

for j := -1 to 1 do

dn := dn + pixcol((x+i+width) mod width,

(y+j+height) mod height) and 1;

Suppose for example, that _x_ is 31 and _y_ is 0 on a 32×32 grid, so the pixel (_x_,_y_) is at the top-right corner. Then as _i_ and _j_ both count from -1 to 1, the expression "(_x_+_i_, _y_+_j_)" passes through 9 combinations of coordinates (including (31, 0) itself when both _i_ and _j_ are zero):

(30, -1) (31, -1) (32, -1) _j = -1; y+j = -1_

(30, 0) (31, 0) (32, 0) _j = 0; y+j = 0_

(31, 1) (31, 1) (32, 1) _j = 1; y+j = 1_

_i = -1; x+i = 30 i = 0; x+i = 31 i = 1; x+i = 32_

The shaded combinations are not legitimate gridpoints, because the coordinates in each direction run only from 0 to 31, so both -1 and 32 are "illegal" values. But suppose now that we do the following to the coordinates within each pair -- _add 32, then take the remainder on division by 32_. The effect on the numbers shown above is as follows (using _mod_ as the remainder function):

| _n_ |         | -1 | 0 | 1 | 30 | 31 | 32 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| _n_ + 32 |  | 31 | 32 | 33 | 62 | 63 | 64 |
| (_n_ + 32) _mod_ 32 |  | 31 | 0 | 1 | 30 | 31 | 0 |

Notice how -1 has "wrapped around" to 31, and 32 to 0, while the four legitimate values are unaffected. This changes our 9 combinations of coordinates to exactly what we want them to be:

(30, 31) (31, 31) (0, 31)

(30, 0) (31, 0) (0, 0)

(31, 1) (31, 1) (0, 1)

Thus our command:

dn := dn + pixcol((x+i+width) mod width,

(y+j+height) mod height) and 1;

does check the correct neighbourhood of pixels around (_x_,_y_), both at the edges and in the middle of the grid (and it's written in such a way that _width_ and _height_ could take values other than 32).

Now let's look at what's happening to _dn_. This is first set to 0, and then gets repeatedly incremented by (_pixel_ _and_ 1), where _pixel_ is in turn the colour code of the 9 cells in the neighbourhood of (_x_,_y_) -- i.e. cell (_x_,_y_) itself and its 8 neighbours. "(_pixel_ and 1)" applies the _and_ operator between _pixel_ and #000001, thus yielding the value of the least significant bit, which is what we are using to record whether the cell is alive or dead (and note that we could equally well have used "(_pixel_ mod 2)" here, because the last bit is 1 if and only if _pixel_ is odd). If the cell is alive, and _pixel_ is _black_ or _blackish_, then _pixel_ is even, so (_pixel and_ 1) will be 0\. If dead, and _pixel_ is _white_ or _whitish_, then _pixel_ is odd, so (_pixel and_ 1) will be 1\. Hence the command above does indeed succeed in counting the number of dead cells in the neighbourhood (and its doing so will be unaffected if some of the cells change colour from _black_ to _blackish_, or from _white_ to _whitish_). Having counted the number of dead cells, it's easy to modify the Game of Life rules accordingly:

*   A cell that is currently alive will stay alive in the next generation _if, and only if_, there are currently 5 or 6 dead cells (i.e. 4 or 3 live cells) in the neighbourhood. Otherwise, it dies.
*   A cell that is currently dead will become alive in the next generation _if, and only if,_ there are currently 6 dead cells (i.e. 3 live cells) in the neighbourhood. Otherwise, it stays dead.

Applying these rules to cell (_x_,_y_) can now be done as follows, bearing in mind that (_black_ _xor_ 2) is _blackish_, and (_white xor_ 2) is _whitish_. We want to make these colour changes (signifying an impending change of state) if _either_ cell (_x_,_y_) is alive but the neighbourhood has neither 5 nor 6 dead cells, _or_ if cell (_x_,_y_) is dead and the neighbourhood has exactly 6 dead cells:

if ((pixcol(x,y) and 1=0) and ((deadns&lt;5) or (deadns&gt;6)))

or ((pixcol(x,y) and 1=1) and (deadns=6)) then pixset(x,y,pixcol(x,y) xor 2);

If we go through all the cells in the grid, performing these steps, then by the time we have finished, we will still have a grid that looks exactly the same (since _blackish_ is indistinguishable from _black_, and _whitish_ from _white_), but in which every cell that is due to change from live to dead, or vice-versa, will actually have subtly changed colour. And we will have done all this without allowing the calculations on each cell to affect those on its neighbours. All that remains, to finish this "generation" of the Game of Life, is to go through the entire grid updating _blackish_ (i.e. dying) to _white_ (i.e. dead), and _whitish_ (i.e. resurrecting) to _black_ (i.e. alive). This can be done routinely:

if pixcol(x,y)=#2 then

pixset(x,y,white)

else

if pixcol(x,y)=#FFFFFD then

pixset(x,y,black)

or more cleverly, with bitwise operations:

if (pixcol(x,y) and 3) mod 3&lt;&gt;0 then

pixset(x,y,pixcol(x,y) xor #FFFFFD)

This uses the fact that _blackish_ differs from _white_, just as _whitish_ differs from _black_, in every bit except for the second last. So _xoring_ with #FFFFFD -- which has every bit set _except for the second last_ -- accomplishes exactly the changes we want. To test for the cells which need to be updated, we take the bottom two bits of the pixel colour (by _anding_ with 3), and then find the remainder when this number is divided by 3\. If the two bits are the same, then they make either 0 or 3 (00 or 11 in binary), hence zero remainder. If the two bits are different, we get a remainder of either 1 or 2, so we know that the current colour cannot be _black_ or _white_; hence updating is needed. Having completed all these updates, we will be ready to start again on the next generation, and by putting the whole thing within a continuous loop (e.g. "while ?key&lt;&gt;\escape do", which will keep going until the ESCAPE key is pressed), we finish our implementation of the Game of Life.

This full implementation of the Game of Life is available -- in BASIC, Pascal, and Python -- within the Help menu of each language.

## 4.6 Investigating One-Dimensional Cellular Automata

The simplest cellular automata have two possible states per cell (like the Game of Life) but are only one-dimensional, meaning that all the activity takes place along a single line. Though simple, however, this brings a new element of interest for us, because it enables us to picture what happens through the generations, by showing them on successive lines of the canvas. As usual, we'll fix the states of the first generation of cells (along the top line of the canvas) randomly.

Suppose we consider the states as 0 and 1 -- showing as white and black respectively (though we'll use the visually indistinguishable #FFFFFE for white and #000001 for black, so that the bottom bit of each colour code yields 0 and 1 respectively). If we take the _neighbourhood_ of each cell to consist of itself and the two adjacent cells, then there are eight possibilities for each neighbourhood:

111 110 101 100 011 010 001 000

Depending on the nature of our automaton's _transition rule_ -- which is assumed to be _deterministic_ (i.e. not chancy) -- each of these possibilities will lead to one of two specific outcomes in the next generation, making the cell in question (i.e. the middle one of the three) either 0 or 1\. For example, our rule might specify the following transitions for the eight possible neighbourhood situations:

111 110 101 100 011 010 001 000

(R) 0 1 1 0 1 1 1 0

Suppose we apply this rule to a first line that has randomly turned out like this:

| **1** | **1** | **1** | **0** | **1** | **0** | **0** | **0** | **1** | **1** | **0** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

The rule depends on 3-cell neighbourhoods, but the two end cells don't have such a neighbourhood (because they have only one neighbour); hence we imagine the line "wrapping around" so that the "0" at the right-hand end is considered as adjacent (on the left) to the "1" at the left-hand end:

| **0** | **1** | **1** | **1** | **0** | **1** | **0** | **0** | **0** | **1** | **1** | **0** | **1** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Then the result for each of the cells, derived by examining its 3-cell neighbourhood and consulting the relevant part of the rule, will be:

| **1** | **0** | **1** | **1** | **1** | **0** | **0** | **1** | **1** | **1** | **1** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Thus in the first cell, we see "011" leading to "1"; in the second, we see "111" leading to "0"; in the third, we see "110" leading to "1"; in the fourth, we see ""101" leading to "1", and so on.

Of course this is only one possible transition rule, and since there are two possible transitions for each of eight possible neighbourhood situations, it follows that there are -- i.e. 256 -- possible rules altogether. Specifying these rules is very simple, because each transition is to either "0" or "1", so each such choice can be treated as a binary digit, giving us rules numbered from "0000000" (zero) to "11111111" (255 in decimal). And we can see from (R) above that by this method, the illustrated rule is number "01101110" in binary, or 110 in decimal.

The example program "Automata" (pictured here having processed rule 110) counts through an interesting subset of these 256 rules, and it can easily be modified to count through all of them. The _setup_ procedure takes this numeric _rulecode_ as a parameter, and identifies each of its binary digits in turn (by finding the remainder on division by 2, then executing rounded-down integer division by 2 and continuing). Each of these digits is stored in the _nextstate_ array, so _nextstate[5]_, for example, will then specify the required transition for the neighbourhood "101" (which is 5 in binary).

The main program begins by defining the canvas and resolution dimensions as _width_×_height_ in the usual way, and putting appropriate colour codes (#FFFFFE and #1 respectively) into the array elements _cellcol[0]_ and _cellcol[1]_, so that the binary digit resulting from any transition can easily be translated into a pixel colour. Then comes a _for_ loop which sets the variable _n_ counting from 4 to 45, while in turn _rule_ is made equal to (4_n_+2), so that _rule_ counts from 18 up to 182 in steps of 4 (these numbers just happen to give an interesting subset of rules). Each time round the loop, the canvas is cleared to white, and the cells in the top line -- generation 0 -- are filled randomly with either _cellcol[0]_ or _cellcol[1]_. The rest is then filled in by repeated calls of the _nextgen_ procedure, implementing the generations from 1 to the bottom of the canvas (so the number of the final generation is _height-1_).

Procedure _nextgen_ takes the generation number, _g_, as a parameter, and counts through the pixels on canvas row _g-1_ (i.e. the parent row), working out which transitions should be applied to create the pixels on row _g_. Although the parent pixels are indexed horizontally from 0 to _width_-1, this count is extended at each end, going from -1 to _width_, to capture all the 3-cell neighbourhoods using the remainder operator _mod_ in something like the now familiar way:

for x:=-1 to width do

begin

xmod:=(x+width) mod width;

thispix:=pixcol(xmod,g-1) and 1;

n3:=n2*2+thispix;

n2:=n1*2+thispix;

n1:=thispix;

if x&gt;0 then

pixset(x-1,g,cellcol[nextstate[n3]])

end

At the extremes, when _x_ is -1, _xmod_ will be (_width_-1), and when _x_ is _width_, _xmod_ will be 0; in all other cases, _x_ and _xmod_ are equal. This means that as _x_ counts from -1 to _width_, _xmod_ will count from (_width_-1) to 0, wrapping round from the right-hand edge of the canvas to the left, and thus including the full neighbourhood of both extreme cells. As this count proceeds, _thispix_ becomes either 0 or 1, depending on the pixel value of the relevant cell (with "_and_ 1" ensuring that we take only the last binary digit -- as we saw with the Game of Life, "_mod_ 2" would have exactly the same effect). Then, treating the next three lines in reverse, _n1_ is made equal to _thispix_, _n2_ is made equal to _thispix_ plus twice the _previous_ value of _n1_, and _n3_ is made equal to _thispix_ plus twice the _previous_ value of _n2_. So after we have gone round this loop three times -- and using _p[n]_ here to signify the value (i.e. 0 or 1) of the _n_<sup>th</sup> pixel on row (_g_-1) -- these variables will be set as follows:

_x_: 1 _n1_: _p_[1] _n2_: _p_[0]×2 + _p_[1] _n3_: _p_[_width_-1]×4 + _p_[0]×2 + _p_[1]

Thus _n3_ will now have a value which, in binary, reflects the neighbourhood of cell 0 in generation (_g_1). And so to apply the necessary transition rule, we make the next-generation cell at (0, _g_) equal to _nextstate_[_n3_], and set the corresponding pixel colour to _cellcolour_[_nextstate_[_n3_]]. Meanwhile, _n2_ and _n1_ are primed to go round the loop again, so as to recalculate _n3_ to give the neighbourhood of cell 1 next time (when _x_=2), and so on all the way to cell (_width_-1), whose neighbourhood transition will be applied when _x_ finally reaches _width_ (at which point _xmod_ will have wrapped round to 0).

Following the calculation of the remaining generations, the program ends by displaying the rule number, at the bottom left of the canvas:

setxy(0,height-15);

box(25+length(str(rule))*7,14,cream,false);

print(&#039;Rule &#039;+str(rule),4,8);

This first moves the _turtle_ to location (0,85), assuming the _height_ is 100\. Then it draws a cream-coloured "box" (without a border), whose height is 14 pixels and whose width is:

25+length(str(rule))*7.

Depending on whether the rule number has 1, 2 or 3 digits, this gives a box width of 32, 39, or 46 respectively. Then we print "Rule 110" (or whatever) in _Turtle_ font number 4 (Comic Sans) and size 8\. As can be seen in the image of rule 18 below, this gives as neat a finish with a two-digit number as we saw before with three.

## 4.7 Cellular Automata, Patterns in Nature, and Alan Turing

If we compare the pattern produced by rule 18 with the pattern on the shell of a _Conus textile_ sea snail (both are pictured here), one cannot but be struck by their amazing similarity. This seems unlikely to be coincidence, especially when we consider that the snail's shell has been built up through growth along the line of its edge, so that its pattern is the result of a sequence of lines generated through time, just like our cellular automaton patterns.

![https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSN1DxX81fN5XyAAOmjFJYHEk7Pif7QrD77iSg6Jd0Gx4yuGl7B3g](../assets/httpsencrypted-tbn2gstaticcom.jpeg) In 1952, Alan Turing published a paper on "The Chemical Basis of Morphogenesis", in which he hypothesised a "reaction/diffusion" process for the creation of biological patterns such as on the coats of zebras and leopards. In recent years, this theory has inspired cellular automaton models that work in a functionally similar way, and the use of such models to investigate the formation of patterns in nature has become a significant area of fascinating research.
