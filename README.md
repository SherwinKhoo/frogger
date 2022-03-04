# sei_35_p1_frogger

Software Engineering Immersive - Project 1 - Frogger

Project: Build a functional Frogger-type game in a week.

Frogger is an arcade action game developed by Konami. The object of the game is to direct frogs to their homes one by one, by crossing a busy road and navigating a river with obstacles.

Technologies Used

1. Javascript
2. CSS
3. HTML

Motivation

1. Reinforce understanding of Javascript, CSS and HTML.
2. Add to portfolio.
3. Being a "gamer, and having played computer games that someone else made since the 90s, it's nice to finally create one for a change, albeit a clone of a classic game.

Approach Taken

1. Build a grid.
   Created with Javascript instead of hardcoded into the HTML.
   Parameters to control number of "pixels" and individual "pixel" size.
   Makes furture grid changes easier.

2. Add **classes** to all "pixels".
   Makes life a lot easier when watching the classes change with each tick of setInterval().
   Use of **loops** and mathematical formulae to calculate row and column positions.
   Rows calculated first => numerator of the result of total "pixels" divided by width.
   Columns calculated after => remainder of the result of total "pixels" divided by width.

3. Use a **switch cases** to determine if movement via arrow keys are valid for the current position.
   Restricts movement to valid "pixels".

4. Assign further classes as specific identifiers.
   Used to call in specific images.
   For example, which "pixel" should show a frog, and which should show a turtle.

5. Use **setInterval()** to control game mechanics, with varying ticks for different purposes.
   Create a countdown timer.
   Move assets such as vehicles and "floating" objects.
   Listen for an end game condition.

6. Determine "collision" mechanics.
   Check if an element has two specific classes.
   Check if an element has a specific class but not another class.

7. Determine end game conditions.
   Build upon the collision mechanics.
   Use **callback functions**.
   Freeze the game with **clearInterval()** when an end condition is met.

8. Audio files.

Lessons Learnt

1. Setting initial integer values and setting limits for said values.
2. There is always a more elegant solution; 75% of this can be shortened.
3. Using classes only creates the illusion of animation; it doesn't seem to be the most efficient way to handle animation.

Improvements for the Future

1. Time bar instead of a counter.
2. New levels with additional assets.woots
3. Game "paused" at the start; start triggered by player.
4. Multi-player or against an AI trained with machine learning (recursive algorithm?).

Fair Use - This images used are valid for use under fair use.

1. This project is for purely academic purposes.
2. This project will not hinder the copyright owner's ability to sell the related product.
3. There are many similar images and audio files posted elsewhere.

MIT License - Copyright (c) 2022 Sherwin Khoo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Sources

1. Images from Wikipedia - https://en.wikipedia.org/wiki/Frogger
2. Audio files from Classic Gaming - http://www.classicgaming.cc
3. Audio files from MyInstants - https://www.myinstants.com/index/sg/
