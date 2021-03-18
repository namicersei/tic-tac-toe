Some info about the tech stack and the code - 
The tech stack used is angular 8.
I have modularised the code and the files that I have broken it into are ~
- board.component.ts - This is the overall game component. All the logic pertaining to the functioning of the game from then square click to add symbols is written in this component.
- square.component.ts - This is a part of the Board component and is basically responsible for emitting the click events
- winnerCheck.service.ts - This service has all the algorithms related to checking the winner of the game every time there is a square click. It checks the row, column, side diagonal, and the main diagonal for a streak of either X or O in a recursive fashion (DFS). If true it returns the response to the board component. It is also extensible to support a higher numbered grid. 
