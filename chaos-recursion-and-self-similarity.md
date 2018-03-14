---
---
# 7. Chaos, Recursion, and Self-Similarity

Until the 1970s, scientists in many fields focused their attention almost entirely on _linear systems_, which are "well-behaved" in a way that makes them easier to analyse (put crudely, small changes in "inputs" lead to correspondingly small changes in "outputs", so approximation methods work well). But as fast-improving computer technology enabled real physical systems to be modelled, users began to realise that these models were not at all well-behaved in this way. Most famously, in 1961, Edward Lorenz -- working with a computer model of the weather -- discovered that a tiny difference in an initial value entered into the model to represent the condition at one point in time (a value of 0.506, used as an approximation for 0.506127) could lead to totally different future predictions. We thus have _sensitive dependence on initial conditions_, which Lorenz named "the butterfly effect", based on the idea that, if the weather is correctly modelled by equations like those he was working with, then in principle the disturbance caused by the flapping of a butterfly's wings in Brazil could make the crucial difference that later brings about a tornado in Texas.

Subsequent work has shown that _non-linear systems_, commonly exhibiting this sort of sensitive dependence on initial conditions, occur throughout nature -- in every discipline from astronomy, botany, chemistry, economics, and engineering, all the way to zoology -- so that the linear systems deeply investigated by conventional science (and therefore generally assumed in the past to be typical) are the exception rather than the rule. Indeed the mathematician Stanislaw Ulam famously remarked that considering "non-linear systems" as a special subject of study is rather like considering most of biology as the study of "non-elephants". It seems a safe bet that in future decades, scientific attention will increasingly move towards these more complex systems, and it is the development of the computer which has made this possible. Here we will only scratch the surface of a broad and fascinating area, but for many young people hoping for a career in science, this may be where an ability to use the computer as a tool of investigation will be most crucial.

## 7.1 The Logistic Equation {#7-1-the-logistic-equation}

Suppose we have a population of creatures -- insects, for example -- whose generations do not overlap. Adults lay eggs, and by the time the eggs hatch, the parents have died. If resources of food and space are unlimited, then more adults will typically produce more surviving offspring: for example, the number of offspring that survive long enough to become breeding adults in their turn might be 3 times the number of adults. This is a straightforward _linear_ relationship. But as Thomas Malthus famously pointed out in his _Essay on the Principle of Population_ of 1798 (a work which Darwin credited for inspiring his discovery of evolution by natural selection), such multiplicative population growth quickly becomes unsustainable. If we start with 30 insects weighing 5 mg each, and the population multiplies by 3 every year, then after 60 years, the weight of the insect population will exceed that of the entire Earth! So any environment will impose some absolute limit on population growth, and the environmental pressure will typically increase as the population grows closer to that limit. Suppose, for example, that our insects live mainly on a particular kind of plant; then as the population of insects grows, those plants are likely to be damaged and their population seriously reduced from being eaten, and hence only a small proportion of the next generation of insects will be able to find the food to grow successfully to maturity. (Similar issues are familiar from the growth of human populations, where only the increasing use of technology has -- at least so far -- prevented devastation of our own numbers by environmental pressure.)

The dynamics of these sorts of interactions are likely to be complicated in detail, but it turns out that a wide range of models exhibit broadly similar behaviour, so we can confine our attention here to an extremely simple model, based on what is commonly called the _logistic equation_:

$$
P'=rP(1-P)
$$

Here $$P$$ is the current population of insects, as a proportion of the limit that can ever be achievable within that environment (so if the limit is 100000 and the current population is 27183, then $$P$$ is 0.27183). The parameter $$r$$ is the _growth rate_, and the equation predicts $$P'$$, the population in the next generation, again as a proportion of the limit. In the previous paragraph, we imagined a growth rate of 3, generating an exponential explosion of the population as it multiplied, generation after generation. But in this logistic equation, any such explosion is prevented by the $$(1-P)$$ factor, which approaches 0 as the population comes close to the limit (and if $$P$$ actually reaches the limit of 1, then $$P'$$ will plunge to zero, eradicating the population).

![](/assets/logistics_1.png)

What result should we expect from all this? Prior to the non-linear revolution, most scientists would probably have proceeded by analysing the conditions for _equilibrium_ (a method still standard in economics). This involves assuming that the population will eventually stabilise, at which point $$P'$$ will be identical to $$P$$, and for this to happen with $$r$$ equal to 3, $$(1-P)$$ must be 1/3 so that $$P$$ is 2/3. On this basis, we might predict that if the limiting population is 100000, then almost no matter what population number we start from, we should end up with an equilibrium at 66667 (or, since rounding is involved, a minimal oscillation between 66667 and 66666). But in fact, as the image of the [Logistic](https://www.turtle.ox.ac.uk/online/example/Logistic) program illustrates above, that very rarely happens (and only if we happen to start from a lucky value). Instead, we nearly always quickly reach a population that oscillates around that equilibrium, but without ever subsequently getting closer to it. If you click repeatedly on the red "3.0" on the canvas, then the program will be run repeatedly with a random initial population, and you can see this for yourself.

![](/assets/logistics_2.png)

If $$r$$ is less than 3.0, then an equilibrium does in fact get reached, but things are more interesting if we select a larger value for $$r$$, by clicking on "3.5", for instance. Again equilibrium is theoretically possible (at a rounded value of 71429), but now the population will almost always end up oscillating through four different values (50091, 87500, 38281, and 82693). Take $$r$$ higher still, to 3.6, 3.7, 3.8, 3.9 or 4.0, and the population movements become even more surprising, with increasing apparent randomness or -- as it is now known -- _chaotic_ behaviour. (An ambitious student might be interested in modifying the program to allow finer discrimination, e.g. selectable $$r$$ values between 3.51 and 3.59. Theoretically, chaos ensues at 3.57.)

What causes this very surprising behaviour, from such a simple equation? A useful way of visualising what is going on is a "spider diagram", as implemented in the program [LogisticSpider](https://www.turtle.ox.ac.uk/online/example/LogisticSpider). Both the $$x$$- and $$y$$-axes here run from 0.0 to 1.0, and the line `y=x` is also shown (making a 45° angle with both axes). Against this background is plotted the graph of the logistic function , in blue, with $$r$$ taking the chosen value.

![](/assets/logistics_3.png)

In the plot shown above, $$r$$ is 2.9 and the initial population has been randomly given the value of 92701 -- so we start with $$x$$ equal to 0.92701 on the graph. If we now put this value into the logistic function, $$y$$ becomes 0.19622 (the height of the green line going up from the $$x$$-axis just above 0.9). So according to this model, the population has fallen dramatically, from 92701 down to 19622. Where next? The height we have reached on the graph (i.e. 0.19622) now has to be fed in as the next `xvalue`, so to do this, we draw a horizontal line to hit the line $$y=x$$; this is the fairly long green line at around height 0.2, whose left-hand end is at the point (0.19622, 0.19622). Now if we move vertically until we reach the blue curve of the logistic function, the position we reach will correspond to the $$y$$ value we get from putting $$x$$ equal to 0.19622, namely 0.45738 (corresponding to a population of 45738). To get the next point in the series, we again move horizontally until we hit the line $$y=x$$, now at the point $$(0.45738, 0.45738)$$, and then move vertically to hit the blue curve, so as to find the $$y$$-value that corresponds to the $$x$$-value 0.45738 (namely, $$y=0.71973$$). Notice how repeatedly moving to the line $$y=x$$ serves to translate each successive $$y$$-value into an $$x$$-value for the next step. And you will see from the diagram how the series converges onto the point of intersection of the blue curve and the line $$y=x$$: equilibrium is reached at $$(0.65517, 0.65517)$$.

If $$r$$ is given the value $$3.5$$ instead of $$2.9$$, then the shape of the intersection between the logistic function and the line $$y=x$$ crucially changes, with the result that "near misses" are now pushed further away from the equilibrium (at $$0.714285$$) by subsequent iterations, as we see pictured here:

![](/assets/logistics_4.png)

The sequence gets close with the fourth value of $$0.72974$$, but then diverges (with $$0.69027$$, $$0.74829$$, $$0.65923$$, $$0.78626$$, $$0.58819$$, $$0.84778$$, and $$0.45167$$) before converging, after 16 intermediate iterations, to the repeating four-value cycle $$0.87500$$, $$0.38281$$, $$0.82693$$, and $$0.50091$$. Almost any initial value (apart from a "bullseye" on the equilibrium) will likewise converge to this cycle, which we therefore call the _attractor_ of the function. When $$r$$ was $$2.9$$, we saw that the attractor of the logistic function was a single equilibrium value; when $$r$$ is 3.5, the attractor becomes a four-value cycle; what happens if we raise $$r$$ yet further?

If $$r$$ is given the value $$3.9$$, then as with $$3.5$$, any "near miss" of the equilibrium point (which is at $$0.74359$$) will be followed by iterations that get further away, but now there is no settling down into a simple cycle of values. Instead, as shown below, the sequence quickly gets into a _chaotic_ trajectory, jumping around unpredictably and exhibiting a _sensitive dependence_ in which nearby values are followed by diverging rather than converging patterns.

![](/assets/logistics_5.png)

This erratic trajectory is an _attractor_ -- in that almost any initial value will be "pulled" into something like it -- but it is a "strange attractor", because it is divergent rather than convergent. The population will never reach stability, but will be repeatedly subject to "booms" and "busts", driven into these not by any external factors, but simply by the non-linear dynamics of the logistic equation.

Lord Robert May brought the logistic equation to prominence in a famous 1976 article in the journal _Nature_, whose conclusion focuses on its _educational_ significance. There May points out that school and university courses have hitherto been dominated by "the elegant body of mathematical theory pertaining to linear systems", thus developing students' "mathematical intuition" in a way that "ill equips [them] to confront the bizarre behaviour exhibited by … nonlinear systems [which] are surely the rule, not the exception, outside the physical sciences". He finishes as follows:

> "I would therefore urge that people be introduced to [the logistic equation] early in their mathematical education. … Such study would greatly enrich the student's intuition about nonlinear systems. Not only in research, but also in the everyday world of politics and economics, we would all be better off if more people realised that simple nonlinear systems do not necessarily possess simple dynamical properties."

## 7.2 The Mandelbrot Set {#7-2-the-mandelbrot-set}

With the logistic equation, we saw how a sequence of numbers could be generated in turn, by starting with one given number, feeding it into the equation (as $$P$$) to derive the next number in the sequence (as $$P'$$), then feeding this number in to get the next, and so on. We also saw that if $$r$$ takes a relatively high value (e.g. 3.6 or above), then the sequence is _chaotic_, so that it becomes impossible to predict any simple long-run outcome. This also yields _sensitive dependence on initial conditions_, in which even tiny differences at one point in the sequence will magnify as the following numbers are generated, making it impossible to treat one "trajectory" through the numbers as a good approximation of other "nearby" trajectories -- any such nearness is purely temporary.

An even more famous illustration of these sorts of ideas is provided by the _Mandelbrot set_, pictured here (as the black area):

![](/assets/mandelbrot.png)

This set is of great mathematical interest, but we can ignore the surrounding theory and focus on how the image is constructed. The canvas is 1500×1500 pixels, and it here represents -- at a scale of 500 pixels per unit -- the 1.5×1.5 square in the _complex plane_ from -2.0 to 1.0 horizontally, and -1.5 to 1.5 vertically. Thus each point represents a complex number, of which the general form is $$(a+ib)$$, where $$i$$ is the square root of $$-1$$. If you are unfamiliar with complex numbers, just consider instead starting with the point $$(a, b)$$ and following a sequence of points on the graph.

Now suppose we pick a complex number $$z_0=z^2+(a+ib)$$, and form a sequence starting from this, using the formula:

$$z'=z^2+(a+ib)$$

In other words, if $$z$$ is some number in the sequence, then we calculate $$z'$$, the next number in the sequence, by squaring $$z$$ and adding $$(a+ib)$$, which is $$z_0$$, the first point in the sequence. Using $$z_n$$ to signify the number reached after $$n$$ iterations of this process, we can express this as:

$$z_n+1=z_n^2+z_0$$

Squaring the complex number $$(x+iy)$$ can be done by simple algebra, bearing in mind that $$i$$ is the square root of $$-1$$ (so that $$i^2y^2=-y^2$$):

Thus squaring the number represented by the coordinates $$(x, y)$$ takes us to the number represented by the coordinates $$(x^2-y^2, 2xy)$$, and if we then add $$(a+ib)$$, this takes us to $$(x^2-y^2+a, 2xy+b)$$. Note again that this can be understood as generating a sequence of points in the graph, so thinking in terms of complex numbers is not essential. Updating of the $$x$$- and $$y$$-coordinates from one point to the next can accordingly be done straightforwardly as follows:

```pascal
temp := (x*x-y*y)/scale;
y := 2*x*y/scale+b;
x := temp+a;
```

The variable `temp` is used to store the current value of $$x^2-y^2$$, prior to `y` being updated; the only other complication is the use of `scale` -- here 500 -- to transform a _Turtle_ pixel distance into a number in the complex plane (so, for example, if `x` is 700 and `y` is 500, `2*x*y/scale` comes to 1400, as would be expected given that the $$y$$-value of 500 represents the number 1.0).

In the [Mandelbrot](https://www.turtle.ox.ac.uk/online/example/Mandelbrot) example program, however, you will see that the updating is done slightly differently, like this:

```pascal
temp := divmult(x+y,scale,x-y);
y := divmult(2*x,scale,y)+b;
x := temp+a;
```

Recall from §3.3 above that there is a limit of 2147483647 (`maxint`) to the size of integers that _Turtle_ (and indeed, most computer systems) can handle. So if you want to produce images of parts of the Mandelbrot set that involve a high `scale` value (by "zooming in" on particular parts of it, as in §7.21 below), then squaring `x` or `y` directly will probably exceed this limit and generate an error message. _Turtle_ functions such as `hypot` and `divmult` are designed to circumvent this sort of problem, with `hypot(a,b,c)` yielding the rounded result of $$c\times (a^2+b^2)$$, and `divmult(a,b,c)` yielding the rounded result of $$c\times (a/b)$$, while avoiding overflow errors for intermediate results. In the current case, we first want to calculate $$(x^2-y^2)/scale$$, so we take advantage of the well-known formula for _difference of two squares_: $$(x^2-y^2)=(x+y).(x-y)$$; hence `divmult(x+y,scale,x-y)`. Then we calculate $$2xy/scale$$ using `divmult(2*x,scale,y)` so that the multiplication of $$x$$ by $$y$$ takes place safely within the function, with division by `scale` bringing the function's result down below `maxint`.

The Mandelbrot set is the set of points $$(a, b)$$ in the complex plane for which the sequence just explained -- starting from $$(a, b)$$ -- never _diverges_ in the sense of getting further and further from the origin at $$(0, 0)$$. Any sequence that moves further than $$2.0$$ from the origin will diverge, and in order to produce our brightly coloured diagram, we need to keep track of _how quickly_ sequences exceed this crucial distance, so our program combines these tests with the updating calculation as follows:

```pascal
iterations:=0;
while (hypot(x,y,1)<=2*scale) and (iterations<=maxcol) do
  begin
    temp := divmult(x+y,scale,x-y);
    y := divmult(2*x,scale,y)+b;
    x := temp+a;
    inc(iterations)
  end;
```

The loop terminates when _either_ `hypot(x,y,1)` -- the Pythagorean distance of $$(x, y)$$ from the origin -- exceeds 1000 (double the _scale_ value, hence equivalent to a distance of $$2.0$$ in the complex plane), _or_ the number of iterations exceeds `maxcol`, a constant set to $$40$$ at the beginning of the program. So if a sequence has not diverged sufficiently after 40 iterations, then it is presumed never to diverge (which is not strictly correct, but enables us to limit the time that the program will take); hence its starting point is counted as part of the Mandelbrot set and accordingly coloured black. But if a sequence does diverge within 40 iterations, then the starting point is coloured with the _Turtle_ colour code corresponding to the `iterations` value (between $$1$$ and $$40$$ inclusive) at which the loop terminated. Thus points which diverge after 1 iteration are `green`, after 2 iterations `red`, then `blue`, `yellow`, `violet` and so on; this is how we get the brightly coloured image shown earlier.

### 7.21 Zooming in on the Mandelbrot Set {#7-21-zooming-in-on-the-mandelbrot-set}

The [Mandelbrot](https://www,turtle.ox.ac.uk/online/example/Mandelbrot) example program starts with various constants and variable settings like this:

```pascal
CONST maxcol=40;
      scale=500;
      pixels=1500;
      xcentre=-500000; {millionths}
      ycentre=0; {millionths}
VAR xstart,xfinish,ystart,yfinish: integer;
...
BEGIN
  xstart:=divmult(xcentre,1000000,scale)-pixels/2;
  ystart:=divmult(ycentre,1000000,scale)-pixels/2;
  xfinish:=xstart+pixels-1;
  yfinish:=ystart+pixels-1;
  canvas(xstart,ystart,pixels,pixels);
  resolution(pixels,pixels);
```

As we have already seen, `maxcol` determines the maximum number of iterations that are tested (and hence the number of different colours available for the image), while `scale` determines the magnification of the image (relative to the complex plane). The next constant, `pixels`, determines the physical size of the image (which is generated on a square canvas measuring `pixels*pixels`) -- thus the extent of the complex plane that is pictured will be determined by the `pixels/scale` ratio. The positioning of this image in the complex plane is determined by the remaining two constants, `xcentre` and `ycentre`, which specify the mid-point of the image in units of 0.000001 (i.e. millionths). As set up here, `xcentre` has the value $$-500000$$ and `ycentre` has the value $$0$$, so that the centre of the image will be position $$(-0.5, 0)$$ in the complex plane. With `scale=500` and `pixels=1500`, the width and height of the image in the complex plane will be $$1500/500 = 3.0$$, so that the top-left of the image will be at $$(-2.0, -1.5)$$ and the bottom-right at $$(+1.0, +1.5)$$. The calculations of `xstart`, `ystart`, `xfinish`, and `yfinish` shown above ensure that iteration takes place through the relevant values (with $$x$$-values here ranging from $$-1000$$ to $$+499$$, and $$y$$-values from $$-750$$ to $$+749$$).

Now suppose we want to zoom in, at eighty times the magnification factor (i.e. `scale` is $$40000$$ instead of $$500$$), on the region of the complex plane around $$(-0.1592, 1.033)$$, which happens to contain a diagonal "mini-Mandelbrot" (indicated by the arrow on the previous image). Then we can change the constants as follows:

```pascal
scale=40000;
pixels=1200;
xcentre=-159200;
ycentre=-1033000;
```

This generates the image shown here, illustrating how the intricacies of the Mandelbrot set are repeated even under intense magnification -- indeed they go on "all the way down" (though there are of course limits to the detail that can be explored using _Turtle_, because numbers beyond `maxint` cannot be used).

![](/assets/mandelbrot_zoom.png)

### 7.22 Spectral Colouring {#7-22-spectral-colouring}

So far, our colouring of the Mandelbrot set has used the built-in sequence of _Turtle_ colours, which sets adjacent colours as contrasting rather than blending. These images are striking, but it is more illuminating to use colours that change gradually, to indicate more consistently the rate of divergence at different points in the complex plane. A neat way of doing this is illustrated in the example program [MandelbrotSpectrum](https://www.turtle.ox.ac.uk/online/example/MandelbrotSpectrum) pictured here, and the same technique will be used in §§8.5-6 below.

![](/assets/mandelbrot_spectrum.png)

To achieve this, we set up a "spectrum" of reference colours starting with `violet`, then `blue`, `cyan`, `lime`, `yellow`, `orange`, `red`, and back to `violet` again (these colour codes are stored in the `spectcol` array, so that `spectcol[0] = violet`, `spectcol[1] = _blue`, and so on). Then we calculate "boundaries" for each of these (stored in the `boundary` array), spread through the range from $$0$$ to `maxcol`, so that if `maxcol` is $$100$$, then their successive boundary values are: `violet` $$0$$, `blue` $$14$$, `cyan` $$29$$, `lime` $$43$$, `yellow` $$57$$, `orange` $$71$$, `red` $$86$$, and again `violet` $$100$$. Then if we want a colour corresponding to number $$32$$, say, we identify the two boundaries on either side of this (i.e. `cyan` at $$29$$ and `lime` at $$43$$), and we mix the corresponding colours in proportion to our number's closeness to the relevant boundaries (so for number $$32$$, which is $$3$$ away from the `cyan` boundary and $$11$$ away from the `lime` boundary, we mix $$3/14$$ `lime` with $$11/14$$ `cyan`). Here is the function that does the mixing:

```pascal
Function mixcolour(n: integer): integer;
Var col1,col2: integer;
    mix1,mix2: integer;
Begin
  col2:=0;
  repeat
    inc(col2)
  until (boundary[col2]>=n) or (col2=spectrum);
  col1:=col2-1;
  result:=mixcols(spectcol[col1], spectcol[col2], boundary[col2]-n, n-boundary[col1])
End;
```

The parameter `n` is the number (e.g. $$32$$) whose colour we want to find, and we do this by identifying the boundaries (`col1` and `col2`) between which it lies. The result is calculated using _Turtle_'s `mixcols` command, which mixes the two given colours in the given proportions.

## 7.3 Self-Similarity, Recursion, and the Sierpinski Triangle {#7-3-self-similarity-recursion-and-the-sierpinski-triangle}

The Mandelbrot set is an example of a _fractal_ pattern, combining intricacy, where the function is sensitively dependent on small changes of location, and _self-similarity_, where zooming into areas within the pattern reveals small copies -- or near-copies -- of the whole (as we have seen). In this case the self-similarity results from the generating function which is repeatedly mapping a limited area into itself. A more straightforward way of producing self-similarity is with _recursion_.

Suppose we start with the following simple program, which draws an equilateral triangle of side length 256 (as pictured), having first made a small movement to place it more centrally. Note that the _triangle_ procedure can draw a triangle of any _size_ greater than 1, using three _forward_ movements and three turns of 120° (so the _turtle_ ends up pointing in the original direction).

PROGRAM triangles;

Procedure triangle(size: integer);

Begin

if size&gt;1 then

begin

forward(size);

right(120);

forward(size);

right(120);

forward(size);

right(120)

end

End;

BEGIN

movexy(-100,150);

triangle(256)

END.

If we insert the command triangle(size/2) three times, immediately after the _forward_ moves, then we get the "Recursive triangles" program from the _Turtle_ Help menu, which produces the image shown here. Now each time the _triangle_ procedure draws any side of a triangle, it will interrupt the drawing of the current triangle and instruct the drawing of a complete new triangle of half the _size_. So around the central triangle of size 256, we see 3 triangles of size 128; around those are 9 triangles of size 64; around those are 27 of size 32, and so on. Recursion stops when the _size_ parameter gets down to 1, and the procedure then just exits without doing anything.

This image is reminiscent of the _Sierpinski Triangle_, a fractal that is standardly created by taking a large equilateral triangle, dividing it into four smaller equilateral triangles, "erasing" the central one, and then repeating these operations on the three other triangles. The "Sierpinksi" example program works like this, producing the image shown here (which is given a cream background so as to highlight the progressive erasing of the central triangles). As with the previous program, the recursion is made to terminate when the triangle size gets very small.

Another more surprising way of generating a Sierpinski triangle is by starting with a random point within the overall triangular area, then repeatedly choosing one of its three vertices at random, moving halfway towards it, and drawing a dot. Here are the program and resulting image:

PROGRAM Sierpinski_Dots;

VAR x: array[0..2] of integer;

y: array[0..2] of integer;

thisx,thisy,thisc: integer;

BEGIN

x[0]:=400;

y[0]:=138;

x[1]:=843;

y[1]:=650;

x[2]:=179;

y[2]:=778;

thisx:=random(200)+400;

thisy:=random(200)+400;

repeat

thisc:=random(3);

thisx:=(thisx+x[thisc])/2;

thisy:=(thisy+y[thisc])/2;

pixset(thisx,thisy,purple)

until 0=1

END.

This records the coordinates of the triangular area at (400,138), (843,650) and (179,778) -- all set so as to match the three vertices of the output produced by the "Triangles" program. A random initial point is chosen with x- and y-coordinates (_thisx_ and _thisy_) between 400 and 600, and then we reach the _repeat_ loop. This first sets _thisc_ randomly to 0, 1, or 2, then moves _thisx_ and _thisy_ (whatever they might currently happen to be) halfway towards the corresponding point of the triangular area -- e.g. if _thisc_ is equal to 1, then (_thisx_,_thisy_) is moved halfway towards (_x_[1]_, y_[1]) which is (843,650). Then a purple pixel is placed at the new point; and the loop repeats. Leave this running, and a Sierpinski triangle gradually emerges!

## 7.4 From the Sierpinski Triangle to Iterated Function Systems {#7-4-from-the-sierpinski-triangle-to-iterated-function-systems}

Yet another way of creating a Sierpinski triangle provides a good way into the theory of _iterated function systems_ (IFSs), which, as we shall see, enable intricate and beautifully natural patterns to be generated with surprising ease. For obvious reasons, we focus here on IFSs that operate on the _Turtle_ canvas, and for this purpose, it will help to use a standard background pattern, like that generated by the "IFS_Background" example program (shown here). This includes a grid that is helpful for recognising where the pattern has been rotated or shrunk, and also a spectrum of colours which makes the various parts easy to distinguish.

Now suppose we define a function which "maps" points on this 1000×1000 canvas to other points, for example by mapping to . Imagine starting at the top of the canvas, moving down through the pixel rows, and copying the colour from each pixel onto the corresponding pixel as determined by this mapping -- e.g. the pixel at (100, 500) is copied to (0.5×100+250, 0.5×500) which is (300, 250). The result is shown here. Notice how, in accordance with the specification, the entire original canvas has been copied but reduced 50% in each direction, and shifted right by 250 pixels.

What would happen if, instead of starting from the top in this mapping operation, we started from the bottom and moved upwards? This would mean that by the time we reached halfway up, the bottom of the canvas pattern would _already_ have been copied there, so that as we continued upwards, we would be _recopying_ that already-copied part. This recopying would be done three-quarters of the way up the canvas, so by the time we reached that point in our sweep up the canvas, we would be _recopying_ the _recopy_ of a _copy_ (to seven-eighths of the way up). Thoughts of the Sierpinski triangle might be rekindled by the resulting image, again shown here. But to follow the Sierpinski path, we need to make _three_ reduced copies of our canvas, with the following mappings (the first of which is the same one we just used):

_[top centre]_

_[bottom left]_

_[bottom right]_

Performing these in different orders will yield different results, but here is shown what we get if we do them in the listed order, scanning the first from bottom to top and the others from top to bottom. Looking at the bottom right of the canvas (last performed and therefore most developed), it is easy to imagine that repeating these operations may before long give us something very like a Sierpinski triangle, at least in the repeatedly recopied parts (rather than the backgrounds). You can try this out for yourself using the "Sierpinski_Colour" program, and there's no need to examine the code in detail: just go to the bottom and note that the mappings are done using the _domap_ procedure, whose first parameter specifies which mapping is to be done (i.e. 1, 2, or 3), while the other specifies the direction (1 for downwards and -1 for upwards).

The coloured background in these programs is helpful for understanding how the mappings work, but otherwise an unwelcome complication -- for example, it is obviously impossible to achieve a clean Sierpinski triangle if the background parts are never erased. So to take this further, we shall from now on treat the canvas -- as we did in the Game of Life -- as consisting only of "live" (black) and "dead" (white) cells, with just one third colour (e.g. _red_) to keep track of intermediate copying. We start with all cells _black_ (i.e. live), and then repeatedly:

*   apply our three mappings to those cells that are not currently dead, making the copies _red_ (this is done in the modified _domap_ procedure);
*   at the end of each iteration, kill off any cells that are still _black_ (and hence have not been copied over), while making the _red_ cells _black_ (this is done in the _cleanup_ procedure).

This program -- "Sierpinski_Map" -- is written so that the _live_ and _copied_ cells can be set to any colour other than _white_. Choosing _red_ makes the processing very clear, but if instead you want to see the eventual pattern gradually refining, then _darkgrey_ is a good choice, since this is close enough to _black_ that it becomes almost indistinguishable on small areas. The program works slowly because it is doing so much pixel manipulation, but watching it will help to give a good understanding of how the iterative mapping process is working, and the result is very satisfying!

With the Sierpinski triangle in view, consider how this program has reached it, which is conceptually very simple. Starting with a fully "live" canvas, on each iteration it has made three reduced copies of the live-cells pattern (each copy being produced by one of our defined mappings), and then it has killed off any cells that do not feature in any of those copies. These iterations continued until _every_ cell in the pattern was getting recreated on copying, so that the pattern of live cells from one iteration to the next became constant -- this final pattern is called the "fixed point" of the set of mappings. Now obviously in practice there is a lot of approximation going on here, because our canvas is only 1000x1000 (or whatever) and cannot store detail "all the way down". But if we ignore this limitation, and ask what kind of pattern could possibly provide a fixed point of this sort of mapping system, it is clear that _only_ a self-similar fractal pattern could do so. Only such a fractal could have the property that the entire original pattern, shrunk to 50% size, exactly matches a sub-part of that original pattern. So it should be no surprise that the process of iterating our mapping functions -- if it reaches a fixed point at all -- ends up yielding a fractal pattern.

What might, however, be more surprising is that an _iterated function system_ of this kind will yield the very same fixed point pattern irrespective of its starting point. We began with a canvas in which every cell was live, but in fact the result will be identical (apart from the time taken) if we start instead with a small blot anywhere on the canvas! That blot will be copied (and shrunk) three times on the first iteration, then each of those copies will be copied (and shrunk) on the second iteration, and so on. The continual shrinking of scale means that eventually some part of the copied pattern will get close enough to coincide with pixels in the Sierpinski fixed-point pattern, after which every subsequent threefold copy of those pixels will populate other pixels in that fixed-point pattern (since the fixed-point pattern is by definition the pixel pattern that gets copied into itself). This same logic means that the program could start from one single live pixel (e.g. try replacing "_blank(black)_" with "_pixset(1,1,black)_" near the start of the main program). And this in turn enables us to explain why the surprising program "Sierpinski_Dots" (at the end of §7.3 above) works. Recall that this started with a single random dot, which was moved iteratively halfway towards a (randomly chosen) vertex of the pre-defined large triangle. But such a halfway move is, in effect, exactly the same kind of mapping that we have defined above: if we imagine every point of the large triangle being copied by such a movement, then the result would be a copied triangle of half the size, occupying one corner of the original triangle. So the "Sierpinski_Dots" program is, in effect, an implementation of the same kind of iterated function system that we have been exploring here, except that instead of copying the entire pattern on each iteration, it copies only one pixel while retaining all the pixels that it has previously visited, and thus -- over time -- builds up the same pattern (though probably with small imperfections because it will also, of course, include any initial pixels that it visited before it reached one of the fixed-point pixels).

## 7.5 From Iterated Functions to Ferns and Dragons {#7-5-from-iterated-functions-to-ferns-and-dragons}

The "Sierpinski_Map" program is designed to be very easily modifiable to work with other iterated function systems, simply by changing the relevant constants (i.e. the canvas dimensions, scaling factor, numbers of mappings, title, and -- if desired -- colours) and replacing the _setup_ procedure (which, together with the scaling factor, defines the details of the mappings). The "Barnsley_Map" program is modified in this way, to apply the following four mappings to a 500×1000 canvas stretching from (-236,1) to (263,1000), and starting with a single live pixel at (1, 1).

The target coordinates are calculated within the _map_ procedure, using the _scale_ constant and the specific parameters for each mapping (_mapxx_, _mapxy_, _mapxc_, _mapyx_, _mapyy_ and _mapyc_), as defined in the _setup_ procedure. The commands that perform the calculations are fairly straightforward:

newx:=divmult(x,scale,mapxx[a])+divmult(y,scale,mapxy[a])+mapxc[a];

newy:=divmult(x,scale,mapyx[a])+divmult(y,scale,mapyy[a])+mapyc[a];

So, for example, taking the fourth and last mapping above, _mapxx[4]_ is 15, _mapxy[4]_ is 28, _mapyx[4]_ is 26, and _mapyy[4]_ is 24; these are all divided by _scale_ (i.e. 100) to give the relevant coefficients (0.15, 0.28, 0.26 and 0.24 respectively). The relevant constants -- _mapxc[4]_ is 0, and _mapyc[4]_ is 44 -- are actual pixel counts, and so unscaled.

The resulting image -- which for realism is created green rather than black -- is shown here; it is known as the Barnsley fern, after Michael Barnsley who discovered this wonderfully simple way of mimicking naturally self-similar patterns. It is surely remarkable that an otherwise identical program can yield either the Sierpinski triangle or this intricate fern, just by changing the coefficients of a few mappings! But how can the required mappings be identified? What Barnsley did was to observe that the fern pattern is self-similar with three of its own components, though in a more complex way than the Sierpinski triangle. These three components, coloured blue, red and magenta in the image here, correspond respectively to the second, third, and fourth mappings:

maps the entire fern onto the large blue sub-fern;

maps the entire fern onto the red frond;

maps the entire fern onto the magenta frond.

(The first mapping -- not shown here -- simply draws the stalk of the fern, which will then be copied to form the stalk of every frond.)

The program "Barnsley_Colour" (like "Sierpinski_Colour" which we saw in §7.4) can be used to explore these mappings. It includes the command _domap_(2,-1), which performs the second mapping -- this involves shrinking the canvas by around 15%, moving it down and turning it slightly anti-clockwise, as shown here. (When the fixed point pattern has been reached, this will copy the entire fern onto the blue sub-fern.) But if _domap_(2,-1) is replaced with _domap_(2,1), this same mapping will copy the canvas from top to bottom (instead of bottom to top), and as we saw with the Sierpinski triangle, this will allow multiple copyings in a single sweep, generating the fern's curve by this iterated copying. If the commands _domap_(3,1) and _domap_(4,1) are performed next, it should become clear -- as shown here -- how the large curved pattern which was generated down the canvas by the second mapping then gets copied by the third and fourth mappings to the places occupied by the red and magenta fronds in the picture above. Notice also how once these fronds are in place, _subsequent_ applications of the first mapping will copy them further down the canvas to produce the smaller fronds on either side of the curving main fern.

Again, what is remarkable about Barnsley's discovery is how the definition of mappings from a planned pattern to its intended self-similar components, followed by repeated iteration of those mappings until a fixed point pattern is reached, is sufficient by itself to create whatever pattern has those desired self-similarities. So once we have identified and specified the three self-similarity mappings that characterise our desired fern, no further programming or mental work is required -- just press "RUN", and see the pattern emerge! In some cases, as with this fern (or the tree produced by the "Tree_Map" program, as shown here), we might be inspired by natural forms; in others, we might wish to produce patterns that have certain interesting properties, as in the three-way symmetrical "dragon" design whose mappings are as follows:

To enable the coefficients of _x_ and _y_ to be specified to three decimal places, the "Dragon_Map" program uses a _scale_ constant of 1000 rather than 100\. In fact, all three mappings have the same coefficients of both _x_ and _y_, differing only in their constant terms. They all copy the canvas, reduced by a linear factor of 0.577 or (so the copies will each have an area 1/3 of the original) and turned 90° clockwise (achieved by making the new _x_ and _y_ coordinates linear functions of the old _y_ and negative _x_ coordinates). The second mapping is shifted horizontally well to the right of the others, and 200 units lower than the first, while the third mapping is 200 units lower again. When the fixed point pattern has been reached, as shown here, the three copies of the pattern will fit together exactly within the original: here they are coloured green, red, and blue in order. Note visually that if you take the whole pattern, shrink and turn it 90° to the right, you do indeed get the correct shape and orientation for all three of the smaller copies.

## 7.6 Ideas for Independent Exploration: Non-linear Functions, Mandelbrot Tourism, and Self-Similar Patterns {#7-6-ideas-for-independent-exploration-non-linear-functions-mandelbrot-tourism-and-self-similar-patterns}

This chapter has been mainly about mathematical understanding rather than program development, but there is plenty of scope for independent exploration:

*   As mentioned in §7.1, many functions display similar chaotic behaviour to the _logistic_ equation, so you could try discovering other such interesting functions (making sure that they map values from the relevant range -- e.g. 0.0 to 1.0, or 0 to 1000 -- into that same range).
*   In §7.21 and §7.22, we saw a program that "zooms in" on the Mandelbrot set. Try viewing some well-known tourist sights, such as "Sea Horse Valley" (centre around (0.79,0.15), e.g. with a scale of 5000 and 1000x1000 pixels) or "Elephant Valley" (centre around (0.34,0.127), e.g. with a scale of 5000 and 1300x1300 pixels). If you're feeling seriously ambitious, try to develop a Mandelbrot program that works more efficiently (e.g. by spending less time scanning large black expanses), or which enables you to specify a "zoom area" with the mouse.
*   §7.3 showed how to produce a recursive triangle-drawing program, using a technique that could easily be adapted to generate all sorts of beautiful self-similar patterns. The _Turtle_ Help menu includes a "Recursion Factory" program that facilitates exploring some of these possibilities.
*   Try running the Iterated Function System programs of §7.5 with mappings you have worked out yourself, designed to generate different patterns of self-similarity. Some of these might be inspired by natural objects (like Barnsley's fern), but others might be sheer invention -- and who knows what you might discover?
