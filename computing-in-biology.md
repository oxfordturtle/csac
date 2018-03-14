---
---
# 6. Computing in Biology: Evolution and Behaviour

Biology provides a wonderfully rich field for computer modelling and exploration, partly because many biological phenomena -- especially those connected with evolution -- are relatively simple from an abstract point of view, but depend on the slow operation of probabilities over huge numbers of repeated events, so that without the computer, we are unable to track them.

Charles Darwin first discovered the phenomenon of evolution by _natural selection_, which will take place whenever three conditions are satisfied:

* Offspring tend to inherit the characteristics of their parents (so, for example, parents who are larger or faster than others will tend to have larger or faster offspring).
* There is variation amongst offspring, even of the same parents (for example, some will be larger or faster than others).
* Some of these characteristics (for example, size or speed) are relevant to the survival and future reproductive success of the offspring.

All of these conditions are obviously true of most familiar species, including ourselves, so we can be confident that natural selection must occur. (But this is not to say, of course, that it is the only significant evolutionary mechanism; and there is plenty of room for controversy about details.)

## 6.1 Cheetahs and Gazelles {#6-1-cheetahs-and-gazelles}

Evolution is fastest when there is some strong _selection pressure_, where the survival or reproductive success of individuals depends very directly on particular characteristics (e.g. size or speed). Where this pressure is constant (e.g. camels that can go longer without water will tend to survive better), evolution will eventually slow. But it will keep much faster when the evolutionary pressure itself increases as more evolution takes place, as in the _co-evolution_ of two species.

Suppose we have two interacting populations of cheetahs and gazelles. The cheetahs cannot survive without catching gazelles to eat, and gazelles can only survive for as long as they can avoid being eaten. We assume, for simplicity, that the only relevant non-chance factor here is _speed_. Thus there is selection pressure amongst the gazelles, because the slowest of them will tend to get caught by cheetahs before they have had time to reproduce. And there is selection pressure amongst the cheetahs, because the slowest of them will have difficulty catching enough gazelles to survive long enough to reproduce. Co-evolution comes in, because as the gazelles get faster, the selection pressure on the cheetahs increases (they have to run faster to catch a meal), and as the cheetahs get faster, the selection pressure on the gazelles increases (they have to run faster to avoid becoming a meal). We have here what is known as a _Red Queen effect_: species have to run faster and faster just to stay (from a competitive point of view) in the same place.

In Lewis Carroll's book _Through the Looking Glass_, the Red Queen tells Alice: "Now, _here_, you see, it takes all the running _you_ can do, to keep in the same place. If you want to get somewhere else, you must run at least twice as fast as that!"

In nature, there are many factors that restrict the extreme possibilities of this sort of evolution. Most obviously, there are physical constraints on the power of muscles, the strength of bone, and the weight implications of increasing either of these -- the heavier the bones and the larger the muscles, the more food will be needed to provide the energy to drive them. And high speed is not always an advantage: a cheetah that ran around at 1000 kilometres per hour would be likely to find encounters with trees or rocks (or indeed other equally fast cheetahs) disastrous!

In the "Cheetahs" example program, we ignore these complications to explore the impressive potential of unconstrained runaway co-evolution. As pictured here, the average speed of the cheetahs has passed 101 km/h, and of the gazelles, 93 km/h, but if left to proceed, both will climb close to the maximum allowed, 1000 km/h. We won't discuss the program in detail here, but make do with describing its behaviour in outline (hopefully enough to enable you to understand the code sufficiently to experiment with editing it for yourself). It makes use of the following global variables:

VAR gen,cnum,gnum: integer;

cspeed,gspeed,cgenspeed,ggenspeed,

cage,gage,cfood: array[1..maxanimals] of integer;

cspeednum,gspeednum: array[0..maxspeed] of integer;

The integer variable _gen_ counts the "generations" (i.e. calls of the procedure _generation_, which simulates the periods of hunting and mating activity), while _cnum_ and _gnum_ keep track of the current numbers of cheetahs and gazelles respectively. The characteristics of these animals are recorded in the following arrays:

_cspeed_, _gspeed_ cheetah and gazelle current speeds (affected by age)

_cgenspeed, ggenspeed_ cheetah and gazelle "genetic" speeds (when healthy)

_cage_, _gage_ cheetah and gazelle ages

_cfood_ cheetah food levels

So, for example, cheetah number 4's characteristics are recorded by _cspeed[4]_, _cgenspeed[4]_, _cage[4]_, and _cfood[4]_. Each of these arrays has 500 elements, set by the constant _maxanimals_ (which, like other constants, can be edited if desired); this is the limit that the program puts on the populations. The other two arrays, _cspeednum_ and _gspeednum_, have 1000 (_maxspeed_) elements -- these are used to compile statistics on the speed distribution of the cheetahs and gazelles, with a maximum allowed speed, _maxspeed_, of 1000 km/h (as shown in the program image above).

Note that the behaviour of this program is controlled by a large number of named constants, which are listed at the beginning of the program. All of these can be edited to get different behaviour, and you are encouraged to play with these values to try to make the model more lifelike. Using names for the various parameters -- rather than "hardwiring" specific numbers into the program -- makes the code a bit longer, but far easier to experiment with.

Procedure _setup_ initialises these arrays, effectively creating the start populations of cheetahs and gazelles, and setting their characteristics to random values within appropriate ranges (e.g. the speeds are set randomly between the constants _startslow_ and _startfast_ -- 30 and 70 respectively. Since the population numbers _cnum_ and _gnum_ are set to the constants _startcheetahs_ and _startgazelles_ -- both 50 -- this means, for example, that the 50 array elements _cspeed_[1] to _cspeed_[50] will each initially have a value between 30 and 70, while _cspeed_[51] to _cspeed_[500] are set to 0\. Once the program starts running and animals start dying and being born, this neat ordering will change (for example cheetah number 4 might die, while cheetah 5 remains alive). Within the program, a speed of 0 is used as a convenient way of identifying when an animal is dead.

After initialisation, the program repeatedly calls the _generation_ procedure to perform each cycle of hunting and mating, and displays graphs showing the current speed statistics of the two populations (the populations and averages are also written to the textual output window, so you can afterwards examine how things have progressed, and record your experiments). **Hunting** is done (assuming the gazelle population is more than _mingazelles_) by randomly choosing in turn a proportion of the live cheetahs (1 in _chuntingratio_ of them), then making repeated attempts (up to a maximum of _huntingtries_) to identify a live gazelle to chase. If the cheetah's speed exceeds that of the gazelle by a certain amount (_catchmargin_), the gazelle is killed by calling procedure _deadgazelle_, and the cheetah's food level is incremented by the amount _cfoodadd_. **Mating** is done very simply for both cheetahs and gazelles (since, for example, sex plays no role). A live animal is identified randomly (which, if a cheetah, must have a food level of at least _cbreedfood_), and its _genetic_ (rather than age-dependent) speed is passed to either procedure _babycheetah_ or _babygazelle_. A baby is born by first identifying a free animal number -- one whose speed is currently 0 -- then setting its genetic speed to the speed of the parent, randomly adjusted within the range _randmarginc_ or _randmarging_, but making sure (using the _min_ and _max_ functions) that it doesn't fall below 1 or above _maxspeed_. Having done this, the baby's actual speed is set to its genetic speed, its age to 0, and -- in the case of cheetahs -- its initial food supply to _cfoodadd_ (i.e. the equivalent of one full gazelle meal). As it stands, the program does not seek for a second parent, and so in effect treats speed as though it were determined by a single inherited gene. You might try experimenting for yourself to see whether altering this makes a significant difference to the evolutionary trajectories.

Through all of this, the population numbers _cnum_ and _gnum_ are continuously updated, as are the arrays _cspeednum_ and _gspeednum_, which keep track of the distribution of speeds amongst the live animals (doing this dynamically is far more efficient than having to recalculate the statistics from scratch every generation). At the end of the _generation_ procedure, more updating takes place: the ages of all the live animals are incremented, and if their ages are greater than _slowage_, their actual speed (but not genetic speed) is multiplied by _agefactor_/100 (if this brings the speed down to zero, the animal dies of old age). In the case of cheetahs, their food level is also decremented, and if that falls below zero, the cheetah dies -- thus cheetahs must catch gazelles to stay alive.

This example makes no attempt to be particularly realistic, but illustrates a range of useful techniques to explore competitive evolutionary scenarios through your own programs. It also provides a testbed for investigating some of the dynamics of simple co-evolution. For example, the constants _randmarginc_ and _randmarging_ respectively determine the extent of random variation in the inherited speeds of cheetahs and gazelles. In the example program, these are both set to 10 (meaning that the baby of a parent with genetic speed 70 km/h would inherit a speed between 60 and 80 km/h). But if you set one of these lower (e.g. to 5), you will find that this significantly affects the rate of evolution of _both_ populations -- if, for example, there are fewer really fast cheetahs, then there is less selection pressure on the gazelles also.

## 6.2 The Sex Ratio {#6-2-the-sex-ratio}

In most sexually reproducing species -- such as humans or cattle -- the ratio of males to females at birth is approximately 50:50, so the number of baby boys is roughly the same as the number of baby girls, and likewise the number of baby bulls and cows. Why this should be the case poses an interesting puzzle, discussed for several centuries, including by Charles Darwin. As regards humans, three "obvious" but unsatisfactory answers might occur to us. First, it might be thought that since there are two sexes, a roughly 50:50 split is exactly what we would expect chance to produce, like tossing a coin. Secondly, we might be aware that sex is determined in humans by whether the relevant sperm carries an X- or Y-chromosome, while sperm are produced by dividing male cells that originally contain both one X and one Y (so the numbers of X- and Y-sperm will automatically be equal). Thirdly, it seems plausible that since humans tend to form long-term stable breeding pairs (we commonly marry), our species is better off with roughly equal numbers of males and females, and hence evolution will favour this ratio.

None of these answers is any good. Pure chance is implausible, because something as fundamental as the sex ratio -- and as relevant to our individual and collective wellbeing -- would be almost certain to be moulded by evolution if there were an advantage in doing so. Likewise, the specific chromosomal mechanism may in practice determine the sex of human offspring, but if the logic of evolution implied a different sex ratio, nature would no doubt have found a way of adapting the mechanism. (In some fish and reptiles, for example, sex of offspring is affected by temperature, while peahens are apparently able to influence the sex of their offspring to maximise the chance that their matings with especially beautiful peacocks will result in males.) As for the theory that the answer lies in pair-bonding, this might seem to work for humans, but it's hopeless for cattle. Any farmer knows that cows are far more useful than bulls in general: they produce young, nurture them (without any help from the father), and don't spend their time fighting! So a herd of cattle is far better off with, say, 90% cows and 10% bulls, yet the natural sex ratio is again around 50:50\. This illustrates that evolution _does not_ automatically favour what is best for the _species_, so even if 50:50 is in fact the best ratio for humans, that alone cannot explain why this occurs.

The "SexRatio" example program, pictured here, demonstrates that _even if_ a sexually reproducing species were capable of determining the sex of its offspring by genetic means (through a hypothetical _fop_ or _female offspring probability_ gene), and _even if_ we "initialise" the population to make this genetic determination very lopsided to start with, the sex ratio will automatically migrate towards 50:50 over time. For simplicity, the program operates with a fixed population of 1000, so each birth corresponds to a random death. For each individual, a record is kept of whether or not they are female (_true_ or _false_), and the value (0-1000) of their _fop_ gene, which determines the probability that any offspring they have will be female:

VAR female: array[1..population] of boolean;

fop: array[1..population] of integer;

The sexes of the initial 1000 are set randomly, and all are given a random _fop_ value between 900 and 1000, meaning that the probability of their offspring being female will be between 90.0% and 100.0%. Then the program runs by simply executing the following "mating" procedure repeatedly, and graphing the results every 400 (_matepergen_) matings.

Procedure domating;

Var A,B,replace: integer;

inheritA: boolean;

Begin

repeat

A:=random(population)+1;

B:=random(population)+1

until female[A]&lt;&gt;female[B];

inheritA:=(random(2)=0);

replace:=random(population)+1;

if inheritA then

fop[replace]:=fop[A]

else

fop[replace]:=fop[B];

female[replace]:=fop[replace]&gt;random(1000);

fop[replace]:=fop[replace]

+random(randomvar*20+1)-randomvar*10;

fop[replace]:=max(0,min(1000,fop[replace]))

End;

To start with, two random individuals _A_ and _B_ are repeatedly selected from the population, until we have two of opposite sex (it does not matter here which is male and which female). Then the variable _inheritA_ is made either _true_ or _false_ (depending on whether _random(2)_ yields 0 or 1), and a random member of the population (number _replace_) is picked for death and replacement. The offspring that takes their place is given either _A_'s or _B_'s _fop_ gene, depending on _inheritA_ (so the inheritance is random), and its sex is determined probabilistically by the value of that inherited gene. (For example, if _fop[replace]_ = 700, then there is a 70.0% chance that this will be greater than _random(1000)_, over the range 0 to 699 of the full range 0 to 999.) Finally, a random variation ( 10 × _randomvar_) is applied to the inherited gene, subject to remaining between 0 and 1000\. We have thus implemented standard inheritance, with limited (_randomvar_ percent) random variation.

The results are plain to see from the graph produced, which always takes the same general form, with the proportion of females initially shooting up above 90% (because every single member of the initial population has a _fop_ value of 900/1000 or more), and then inexorably coming back down to 50%, after which it just randomly "walks" around that value. _This shows that the 50:50 sex ratio is determined by the logic of the evolutionary process, and has nothing to do with chromosomal processes or mating behaviour_ (so this program would have been revelatory to many historical naturalists who took an interest in this question).

The evolutionary logic -- anticipated by Darwin in 1859 and later famously spelled out by Ronald Fisher in 1930 -- is as follows. Suppose we have a population in which 900 are female and only 100 male. Then since every child has both a male and a female parent, it follows that the males are each having, on average, nine times as many offspring as the females (e.g. if every female has one child, the males will on average father nine each). Thus individuals who have low values of the _fop_ gene (and are thus predisposed to produce males) will -- on average -- have offspring who are more productive than offspring of the individuals who have high values of the _fop_ gene (and are thus predisposed to produce females). Hence the former _will have more grandchildren_ than the latter, and so the genes they carry -- the low-valued _fop_ genes -- will spread preferentially in the grandchild generation. So in short, if initially we have far more females than males, then those individuals who are predisposed to produce more males will be more evolutionarily successful, and this will push the sex ratio closer to 50:50\. If, on the other hand, we have far more males than females, then the same logic will favour those who are predisposed to produce more females, and again, the ratio is pushed back towards equality. This is why most sexually reproducing species have a sex ratio around 50:50, and our program nicely demonstrates the mechanism in practice.

One significant complication to all this deserves mention, for the natural sex ratio _at birth_ in humans (independently of artificial interference) is not, in fact, quite 50:50, because on average, more boys are born than girls. In 1710, John Arbuthnot famously used birth and mortality statistics to show that a similar bias could be found for every one of 82 years in London -- a result far too consistent to be plausibly due to chance. He accordingly used it to argue for evidence of divine providence, whereby God wisely makes the sex ratio _differ_ from the chance expectation of 50:50, to take into account the greater death rate of young men compared with young women:

"Males … must seek their food with danger [and so die more] … this loss exceeds far that of the other sex, occasioned by diseases incident to it, as experience convinces us. To repair that loss, provident Nature, by the disposal of its wise creator, brings forth more males than females."

Such historical statistics are apparently in tension with the 50:50 argument outlined above (though strictly, Fisher's argument favours 50:50 parental _investment_ in reproduction of the two sexes, rather than a 50:50 _ratio_ at any point). The tension is resolved by recent research which seems to show that in humans, female fetuses are significantly more likely than males to die during the first three months of pregnancy, and it is this that biases the initial 50:50 ratio (the "primary sex ratio") so that by the time of birth (the "secondary sex ratio"), the statistics slightly favour males.

## 6.3 Flocking Behaviour {#6-3-flocking-behaviour}

Evolution moulds both the development and behaviour of animals, explaining things that might otherwise seem to be carefully _designed_ (like the speed of cheetahs and gazelles, or sex ratios in humans). Evolution can also give rise to behaviour that seems to be _intelligent_ -- acting for some useful purpose, and adaptive to changing circumstances -- and yet is caused not by any thinking brain, but by far simpler (and less biologically costly) mechanisms. One nice example of this is _flocking_ in birds and fish, which brings various benefits (e.g. predator detection, safety of crowds, mate finding, reducing drag) and can often look highly coordinated, but is in fact explicable in terms of simple rules being applied independently by each individual, as demonstrated by Craig Reynolds with his celebrated _Boids_ program of 1986.

The "Flocking" example program implements a simple version of this idea, whereby each individual -- each "boid" -- moves according to three general rules:

*   Avoid getting too close to other boids.
*   Steer in a similar direction to other boids.
*   Aim generally towards the average position of the flock as a whole.

But in addition, this version includes a _target_ location, which moves around a large circle on the canvas, periodically changing location, speed, and direction. On every cycle, each boid has a 10% probability of heading towards this target, and this gives the flock a coherently changing behaviour so that it flies relatively "purposefully" around the canvas rather than wandering aimlessly.

To allow fine adjustment of boid positions and speeds, the canvas is set up as 5000×5000, and to simplify handling of the rotating _target_, the canvas is centred on the origin, as follows:

canvas(-2500,-2500,5000,5000);

(The default pixel resolution of 1000×1000 is not changed, however, as there's no benefit in a finer resolution than can be shown on a normal screen.) The _setup_ procedure places the 30 (_numboids_) boids randomly around the canvas, using the _halocolour_ trick explained in §5.2 to avoid overlap, and assigning random x- and y-velocities (between  _maxspeed_) to each. The _draw_ procedure -- again using a technique from the Brownian motion program in §5.2 -- either draws or erases the flock of boids (depending on whether the _positive_ parameter is _true_ or _false_), while the _averages_ procedure simply calculates the average x- and y-position of the flock, and the average x- and yvelocity.

The _settarget_ procedure sets the target position, depending on the two variables _cycle_ (the number of cycles that have taken place so far) and _tgtangvel_ (which specifies the angular velocity of the target around the centre of the canvas):

tgtx := divmult(sin(cycle*tgtangvel,1,1000),1000,tgtradius);

tgty := -divmult(cos(cycle*tgtangvel,1,1000),1000,tgtradius);

This makes _tgtx_ and _tgty_ equal to _tgtradius_ multiplied respectively by  _sin_(_cycle×tgtangvel_) and cos(_cycle×tgtangvel_), so the target's coordinates move around a circle of radius _tgtradius_, with each cycle advancing the angle by _tgtangvel_. (Note that _tgty_ is made negative because an angle of 0° points upwards, in the direction of negative y; while multiplication by 1000 in the coded _sin_ function followed by division by 1000 in _divmult_ just preserves accuracy.) Procedure _settarget_ also increments the _cycle_ variable; while every 100 cycles (including the very first), it chooses a new value for _tgtangvel_ between -3 and 3 inclusive (using tgtangvel:=random(7)-3). This can suddenly change both the location and rotation of the target, adding interest to the flock's movements (and for variety, if _tgtangvel_ becomes 0, the target will be stationary near the top centre of the canvas).

On each cycle, the main program first calls the _averages_ and _settarget_ procedures (as just described), then freezes the canvas with _noupdate_ before erasing the flock with _draw(false)_ -- but since the canvas is temporarily frozen, of course, the flock will not yet actually disappear. Then the program calls the _move_ procedure for each of the boids in turn, which updates their position ready for being redrawn with _draw(true)_ before _update_ unfreezes the canvas and thus enables them to reappear smoothly in their new position. All that remains to consider now is this _move_ procedure itself, which is where the boid rules of movement are implemented.

Within the _move_ procedure, the x- and y-velocities of boid _b_ are first adjusted towards the relevant overall averages:

boidvx[b]:=boidvx[b]+(avgx-boidx[b])/posfactor +(avgvx-boidvx[b])/velfactor;

boidvy[b]:=boidvy[b]+(avgy-boidy[b])/posfactor +(avgvy-boidvy[b])/velfactor;

By default, _posfactor_ and _velfactor_ are both 50; reducing _posfactor_ will make the boids fly closer together, while reducing _velfactor_ will give them a more uniform velocity. Note that both of these adjustments operate crudely to reduce differences from the average position and velocity of _the flock as a whole_ (using the results of the _averages_ procedure). But the first of the three general rules listed earlier is more specific, taking account only of other boids that are very close by, to avoid getting too close or colliding. This is implemented by going through the other boids, calculating their Pythagorean distance (using the _hypot_ function), and then:

if hypot(distx,disty,1)&lt;neard then

begin

boidvx[b]:=boidvx[b]-sign(distx)*(neard-abs(distx))/nearfactor;

boidvy[b]:=boidvy[b]-sign(disty)*(neard-abs(disty))/nearfactor

end;

If the distance of the other boid is less than _neard_ (the "near distance", 200 by default), then the x- and y-velocities of boid _b_ are adjusted away from it, at a rate proportional to (_neard_-_abs(xdist)_) and (_neardabs(ydist)_) respectively (so repulsion increases with closeness) and inversely proportional to _nearfactor_ (which is 10 by default, but can be adjusted like _posfactor_ and _velfactor_ to change the relative influence of the three rules). Note that while the _abs_ function ensures that it is the absolute distance (rather than direction) that determines the magnitude of the adjustment, the _sign_ function ensures that this adjustment acts in the appropriate direction (without affecting that magnitude).

The standard process of velocity adjustment is now complete (apart from a small correction to avoid over-speeding, which we'll see shortly), but as mentioned above, with a 1 in 10 chance, boid _b_'s velocity will be reset quite differently, in the direction of the rotating target position:

boidvx[b]:=tgtx-boidx[b];

boidvy[b]:=tgty-boidy[b];

If allowed to stand, these velocity settings would take boid _b_ to the target in a single cycle, so they will probably need to be adjusted downwards to conform to a boid's maximum speed. To achieve this, the currently specified speed is calculated, and if it comes out greater than _maxspeed_, both its x- and y-components are scaled down proportionately:

speed:=hypot(boidvx[b],boidvy[b],1);

if speed&gt;maxspeed then

begin

boidvx[b]:=divmult(boidvx[b],speed,maxspeed);

boidvy[b]:=divmult(boidvy[b],speed,maxspeed)

end;

Finally, with boid _b_'s new velocity now determined one way or another, procedure _move_ ends by changing the boid's position accordingly:

boidx[b]:=boidx[b]+boidvx[b];

boidy[b]:=boidy[b]+boidvy[b];

It is best to move the boids sequentially as they are dealt with by this procedure, rather than first calculating the velocities for all the boids and then separately moving them, because the latter would run the risk that two boids might simultaneously fly into the same location. Processing the boids sequentially means that later boids can take evasive action to avoid crashing into earlier boids.

## 6.4 Ideas for Independent Exploration: Evolution and Behaviour {#6-4-ideas-for-independent-exploration-evolution-and-behaviour}

There are many ways in which the programs and ideas explained in this chapter could be further developed to support interesting investigations. The "Cheetahs" program might be enhanced by incorporating more realism, for example in population numbers (of cheetahs versus gazelles), time factors (frequency of hunting and reproduction), and hunting strategies (slow gazelles are not only more likely to be caught by cheetahs, but also more likely to be singled out for hunting by them). The "SexRatio" program could perhaps be adapted to incorporate the complication of differing "parental investment" in the two sexes -- suppose, for example, that an adult has limited resources, and that producing a female (say) requires more of these than a male. The "Flocking" program gives more obvious possibilities of enhancement, for example:

*   Obstacles to be avoided and flown round;
*   Movement based on local trends rather than flock averages (so that the flock can temporarily divide into coherent sub-groups in response to obstacles etc.);
*   Multiple species of boids, flocking independently while avoiding mutual collisions;
*   Predators, to which boids in the locality can be expected to react with extreme avoidance.

As things stand, the main aim of the "Flocking" program is to mimic plausible flock behaviour visually, rather than to model or explain its development. An interesting (though very ambitious) project would be to introduce "genetic" differences between individuals, together with reproduction and death (from predators), as in the "Cheetahs" program. Predator behaviour would have to be programmed also (though this could be fixed rather than "genetically" determined), and it would then be interesting to see whether flock-oriented behaviour could be made to evolve in response to the selective pressure of predation.
