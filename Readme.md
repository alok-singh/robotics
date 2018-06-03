## About Project Robotics
- It is a simulation of a toy car on a table with dimension 5X5.
- Car can be moved one step in facing direction turned left or right or can be placed anywhere on the table.
- The origin (0,0) is considered to be the SOUTH WEST most corner.
- We have two modes 
	- Local mode and 
	- Remote mode(multiple instructors).
    - Select the top checkbox for remote mode.

### How to run project
- run git clone https://github.com/alok-singh/robotics.git
- cd to the folder robotics and run npm install
- run npm start
- go to http://localhost:8080

### How to input you file in single instructor and multi-instructor mode
- For "PLACE" command choose positionx positiony and click on place.
- For "MOVE" command click on move.
- For turn "LEFT" or "RIGHT" click on respective buttons.

### How to run Multi Instructor mode
- Start server (npm start) on a laptop.
- Get ip of this machine (run ifconfig on terminal) let's call it IP.
- Connect another laptop to the same wifi network and go to IP:8080.
- Check Multiple Instructor mode on both machines
- Now robot can receive instructions from multiple customers. 

### There are somethings which I have taken decision for
- If I select remote robot move my robot then disconnect. In that case which I removed local robot from the table. Later if I select remote robot table will show remote robot's position and status.
- If Multiple instructor mode is selected then to show list of local instructions doesn't make sense hence it is hidden.
- We have report screen in both modes
- For Demo purpose I have added settimeout while broadcasting robot actual position to create scenario when robot is offline for 5 seconds, otherwise there will proper apis to get and set the position of robot.
- If multiple Instructions are given to the remote robot when it is performing some command, the newest command will overwrite the all the old commands, since there is no priority.
- Controlls to operate remote robot and local robot remains same

### Feature additions / suggestions
- After this setup anyone can add new components, new pages
- Can implement new design easily.
- on basis of clientid we can prioritise the instructors