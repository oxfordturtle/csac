---
---
# 5. Computing in Chemistry: Diffusion and Brownian Motion

Most chemical processes are too complicated to be modelled simply, but with diffusion and Brownian motion, the computer can help to explain and make vivid how molecules move. The first model here is a sort of cellular automaton -- as discussed in the previous chapter -- and it makes uses of the "bitwise" operator _xor_ which was introduced in §4.4\. But apart from that, it can be understood quite independently, because it works so straightforwardly.

## 5.1 A Model of Diffusion {#5-1-a-model-of-diffusion}

The "Diffusion" example program (pictured here at an early stage in its run) models diffusion between two liquids in a tapering tube. The taper makes things more interesting, because it affects the numbers of the different molecules that come into contact with each other along the tube. To keep the program relatively straightforward, the canvas dimensions and resolution are set such that even though the tube is _visually_ wider than it is high, _in pixels_ its width and height are both exactly 100 (so the pixels are flattish rectangles rather than squares). Having such big pixels affects the quality of the onscreen display, but the text is at least adequate for labelling the two graphs at the top. The upper graph shows the _proportion_ of red molecules at each horizontal point in the tube. The other shows the _number_ of red molecules at each point. Both graphs are continuously updated as diffusion occurs between the red and blue liquids, while two small markers continue to record the original point of division between the liquids.

Most of the program is concerned with setting up the image and handling the graphs, but only the mechanics of diffusion are of interest to us here. The relevant code is as follows:

x1 := random(width);

y1 := random(width);

if y1&lt;=x1 then

begin

y1 := bottom-y1;

x2 := x1;

y2 := y1;

if random(2)=0 then

inc(x2)

else

dec(y2);

temp := pixcol(x1+leftaxis,y1);

if (pixcol(x2+leftaxis,y2) xor temp)=xorval then

begin

pixset(x1+leftaxis,y1,pixcol(x2+leftaxis,y2));

pixset(x2+leftaxis,y2,temp);

if (x2&lt;&gt;x1) then

showswitch(x1,temp)

end

end;

All this is set within a never-ending "repeat" loop to ensure that diffusion will continue indefinitely ("until 0=1"). The loop starts by assigning random values to the variables _x1_ and _y1_, in the range 0 to 99 inclusive (note that the constant _width_ is set to 100, adjustable if desired). But if _y1_ is greater than _x1_, the loop is abandoned and starts again. (If instead we first chose _x1_ and then made _y1_ equal to a random value between 0 and _x1_, that would disrupt the probabilities, making the molecules at the thin end of the tube over-active compared with the rest.) We next treat _y1_ as a distance from the bottom of the canvas, and reassign it accordingly (with "_y1_ := _bottom_-_y1_"). From now on, _x1_ and _y1_ can together be considered as identifying some random pixel within the tube, with _x1_ being measured from its thin end (rather than the canvas origin), so the pixel is physically located at (_x1_+_leftaxis_, _y1_) in canvas coordinates.

Having identified this pixel, _x2_ and _y_2 are made equal to _x1_ and _y1_ respectively, then either _x2_ is incremented or _y2_ decremented (at random). We have now identified a random _pair_ of pixels, which are adjacent either horizontally (if _x2_ was incremented) or vertically (if _y2_ was decremented). The pixel at (_x2_+_leftaxis_, _y2_) is not guaranteed to be within the tube, as it could be in the black border (either above or to the right). But _if_ one of the two pixels is red and the other blue, we now swap them round and record the resulting diffusion. To achieve this, we first note the colour of the first pixel, and call this _temp_. Then we _xor_ this with the colour of the second pixel and check whether the result equals _xorval_, which is set to #FF00FF, the value of (_red xor blue_). This gives a neat way of testing that one of the pixels is red and the other blue (in any order), since if either of them were black, the result would be different. Assuming that the test is passed, we swap the pixel colours. Finally, _if x2 is different from x1_ -- that is, if the swap has been horizontal along the tube rather than vertical within it -- then we graph the change through the _showswap_ procedure, which is given both the _x1_ coordinate and the colour of the first pixel (so it knows where the change has taken place, and what kind of change it was). In the full example program, these molecule swapping and graph adjustment commands take place while the screen is temporarily "frozen" (using _noupdate_ to freeze it, and _update_ to unfreeze it). This improves the smoothness of the visual changes, but doesn't affect the logic.

This mechanism for modelling diffusion -- selecting a random pair of molecules and swapping them -- might seem very crude. But in fact it does give a fairly realistic picture of the overall dynamics, and the program can help to give an intuitive understanding of this important process.

## 5.2 Brownian Motion {#5-2-brownian-motion}

In 1827, the Scottish botanist Robert Brown, using a microscope to examine pollen grains suspended in water, noticed that the grains seemed to move around randomly, as though being hit by some tiny invisible objects. This phenomenon -- named _Brownian motion_ in his honour -- was fully explained by Albert Einstein in one of his great papers of 1905, thus providing the strongest evidence up to that time of the real existence of molecules and the atomic theory of matter.

The "BrownianMotion" example program, pictured here, does not try to model reality accurately (because to scale, the molecules of water would be invisible and their speeds enormous), but instead, aims to give a general understanding of how Brownian motion occurs. We see one blue "pollen grain", which starts out in the centre of the canvas, and lots of red "molecules" which are given random directions and speeds (for simplicity, when they shoot off the canvas at one side, they continue back onto it with the same direction and speed at the other side). The motion of the pollen grain is tracked in a similar way to the projectile and rocket of Chapter 3, by recording its x- and y-position, and its x- and y-velocity, using integer variables:

VAR px, py: integer;

pxvel, pyvel: integer;

The same sort of tracking has to be done for the molecules, but since there are lots of them -- in fact 400, given by the value of the constant _molecules_ -- it is impractical to have separately named variables for each of them. Instead, we define appropriate _array_ variables:

mx, my, ms, md: array[1..molecules] of integer;

The array _mx_ now contains 400 integer variables, named in turn _mx[1]_, _mx[2]_, _mx[3]_, and so on up to _mx[400]_. So these can be used to store the x-coordinate of each of the molecules, and likewise _my[1]_ to _my[400]_ will store the corresponding y-coordinates. To record the velocities of the molecules, it is simpler to store their _speed_ (in canvas units per cycle) and _direction_ (in degrees) rather than x- and y-components, because this will enable us to use the _turtle_ to calculate their movements. Hence we define the arrays _ms_ and _md_ for this purpose.

The _setup_ procedure of the program puts the pollen grain in the centre of the canvas and initially at rest (so _px_ and _py_ are 500; _pxvel_ and _pyvel_ are 0). Then a "halo" blot is drawn around it, whose radius -- called _hitradius_ -- is equal to the pollen radius plus the molecule radius:

setxy(px,py);

colour(halocolour);

blot(hitradius);

The colour _halocolour_ has code #FFFFFE (set as a constant at the beginning of the program) and is thus indistinguishable from white, so this blot will not be visible on the canvas. Its role is to mark out prohibited places for molecules to be located, avoiding overlap between the circle marking the pollen grain, and the circle marking the molecule. So when we now run a loop to place the (centres of the) molecules, we make sure that only _white_ pixels are chosen:

for n:=1 to molecules do

begin

repeat

mx[n] := random(1000-2*molradius)+molradius;

my[n] := random(1000-2*molradius)+molradius

until pixcol(mx[n],my[n])=white;

ms[n] := random(highspeed-slowspeed+1)+slowspeed;

md[n] := random(360);

setxy(mx[n],my[n]);

blot(2*molradius)

end;

First, random values are chosen for _mx[n]_ and _mx[y]_, ensuring that both are far enough away from the edges of the canvas to avoid overlap (which isn't really necessary here -- just ":= _random_(1000)" would be fine -- but it illustrates how to do this sort of thing in your own programs). Then the corresponding pixel colour is tested, and if it's anything other than _white_, new choices are made. Once a white location has been identified, _ms[n]_ is given a random value between _slowspeed_ and _highspeed_ inclusive, _md[n]_ is given a random value between 0 and 359, and a blot (still coloured _halocolour_) is drawn in the relevant position, to stop any future molecule overlapping with this one. (Again, avoidance of overlap isn't really necessary here, so this blot drawing could be omitted, but the technique may be useful in other programs.) By the end of the _setup_ procedure, non-overlapping locations will have been identified for the pollen grain and for all 400 molecules, but so far, the canvas will still appear to be completely white, with the _halocolour_ blots indistinguishable.

Drawing of the pollen grain and molecules is done by the _draw_ routine, which demonstrates another useful technique:

Procedure draw(positive: boolean);

Var n: integer;

Begin

if positive then

colour(molcolour)

else

colour(white);

for n:=1 to molecules do

begin

setxy(mx[n],my[n]);

blot(molradius)

end;

if positive then

colour(polcolour);

setxy(px,py);

blot(polradius)

End;

This procedure takes a "Boolean" parameter (named after the British mathematician and logician George Boole) -- that is, a parameter that is either _true_ or _false_. If _true_, then _molcolour_ (i.e. _red_) is selected as the colour for the molecules, and _polcolour_ (i.e. _blue_) as the colour for the pollen grain. But if the parameter is _false_, then both pollen grain and molecules will be drawn as _white_ -- thus they will be erased. This enables easy expression of the main loop of the program, following the usual sequence of operations as explained in §2.1: freezing the canvas, erasing the objects with _draw_(_false_), moving them, redrawing them with _draw_(_true_), and then unfreezing.

## 5.3 Moving and Handling Collisions {#5-3-moving-and-handling-collisions}

To move molecule number _m_, we take advantage of the _turtle_ (just as we did in §2.3 earlier):

setxy(mx[m],my[m]);

direction(md[m]);

forward(ms[m]);

...

mx[m]:=(turtx+1000) mod 1000;

my[m]:=(turty+1000) mod 1000;

First, the _turtle_ is placed in the current location of the _m_<sup>th</sup> molecule using _setxy_, then the _turtle_'s direction is set to the current direction of that molecule (i.e. _md[m]_), and it moves forward by that molecule's speed (i.e. _ms[m]_). After moving, _turtx_ and _turty_ will yield the new position of the _turtle_, so that the new molecule coordinates -- the updated _mx[m]_ and _my[m]_ -- can be set accordingly. But to do this we don't simply make _mx[m]_ equal to _turtx_ and _my[m]_ to _turty_, because if the movement has carried the _turtle_ off the canvas, then we want to put the molecule back on the other side of the canvas. This is achieved by adding the canvas width or height (i.e. 1000) and taking the remainder when the result is divided by 1000 -- so values between 0 and 999 remain unchanged, while -5, say, becomes 995 and 1010 becomes 10\. (This technique, using _mod_, was introduced in §4.5.)

But there is a major complication to be taken into account, which is precisely what Brownian motion is all about: the molecule might, in its movement, collide with the pollen grain. The gap in the code above -- shown as "..." -- contains code to deal with such a collision, which is conceptually quite tricky, but demonstrates some useful techniques:

if hypot(turtx-px,turty-py,1)&lt;=hitradius then

begin

while hypot(turtx-px,turty-py,1)&lt;hitradius do

back(1);

turnxy(px-turtx,py-turty);

degturn := turtd-md[m];

md[m] := (180+(turtd+degturn)) mod 360;

impact := cos(degturn,1,ms[m]);

pxvel := pxvel+sin(turtd,1,impact);

pyvel := pyvel-cos(turtd,1,impact)

end;

A collision occurs when the distance between the centre of the molecule and the centre of the pollen grain (as calculated by Pythagoras's theorem using the _hypot_ function) is equal to the sum of their two radii, for which we have the convenient constant _hitradius_ (equal to _polradius_+_molradius_). But of course the movement of the molecule, as described above, is quite likely to "overshoot", so that its calculated position turns out to be overlapping with the pollen grain rather than just touching it. In this case, we need to "backtrack" -- pulling the molecule backwards -- until the two circles are just touching. Here our use of the _turtle_ to do the molecular movement is really helpful, because we can use the _back(1)_ command to pull it back, one step at a time, until the calculated distance between the centres is just enough to remove the overlap.

We have now identified the position where the molecule collides with the pollen grain, and our task is to work out how this will affect the direction of the molecule after it bounces off the grain, and the effect of the collision on the pollen grain itself. For simplicity, we here assume that the impact is completely "elastic" and that the speed of the pollen grain is negligible compared with that of the molecule -- hence the _molecule's_ speed will be unaffected by the bounce, and its lines of approach and departure will be symmetrical around the line of centres:

pollen grain

line of centres

molecule

The x-distance between the centre of the molecule (at _turtx_) and the centre of the pollen grain (at _px_) is (_px_-_turtx_), while the y-distance is (_py_-_turty_). Hence the _turtle_ can be made to point along the direction of this line using the command turnxy(px-turtx,py-turty). This adjusts _turtd_ accordingly, so if we now set variable _degturn_ equal to (_turtd_-_md[m]_), this will tell us how far the molecule's initial direction of motion _md[m]_ has to turn to be pointing directly along the line of centres -- this turn is shown by the curved arrow in the diagram above. If we then add _degturn_ to _turtd_, and reverse the direction (by adding 180° and then, if necessary, subtracting 360°), that gives us the direction in which the molecule should bounce back from the collision.

As for the impulse of the molecule on the pollen grain -- that is, the resulting change of momentum -- this will act down the line of centres, and its magnitude will be proportional to the molecule's velocity down that line, which is equal to the molecule's speed _ms[m]_ multiplied by the cosine of the angle _degturn_ (as shown by the curved arrow in the diagram). For the sake of simplicity, we record the velocity of the pollen grain in these same proportional units, so no conversion is required at this point (it takes place later, when the velocity is divided by the constant _speedratio_ before being applied to the position of the pollen grain). Since the impulse acts along the direction _turtd_, its x- and y-components are found by multiplying respectively by sin(_turtd_) and cos(_turtd_). (The latter is negative because when _turtd_ is zero -- pointing north -- this is in the _negative_ y direction.) Then _pxvel_ and _pyvel_ are adjusted accordingly, reaching the end of the code above. This whole process is repeated for every molecule, so _pxvel_ and _pyvel_ will be changed repeatedly if there are several collisions in a single cycle. Finally, at the end of this cycle, the pollen grain is moved to reflect the overall resulting velocity, by px:=px+pxvel/speedratio and py:=py+pyvel/speedratio, before being redrawn in its new position. The constant _speedratio_, set at 10, can be adjusted to change the jerkiness or smoothness of the pollen grain's movement.

## 5.3 Ideas for Independent Exploration: Laws of Diffusion, and the Diffusion of Disease

One interesting challenge for ambitious students would be to try developing the diffusion model of §5.1 (or something like it) to derive the laws of diffusion that were first stated by Adolf Fick in the nineteenth century.

Another promising investigation, as suggested in the previous chapter, would be introduce diffusion into the SIR model of infection discussed at §4.2\. This might be expected to have a dramatic impact on the spread of disease, since infected individuals will then be free to move beyond the neighbourhood of those previously infected, thus coming into contact with a new range of susceptible individuals. It would be interesting to see how "quarantine" -- putting up barriers to movement in various places, depending on the severity of an outbreak -- can influence the spread of infection, and to explore the interplay of this with inoculation as a strategy for controlling the spread and duration of epidemics.
