# Bolta leikur
ætla gera leik það sem notandi stjórnar streng
með bolta á endanum og á að hitta honum ofan í bolla. um leið og notandi nær að hitta einu sinni byrjar tími að renna og á þá notandi að ná að hitta öðrum áður en tíminn rennur út, annars fer score aftur í núll,

bæði circle og rect eru svipuð, gæti verið með base class og svo inheritað circle og rect útfrá því?, taka báðir inn x,y,(w,h)/r,options og eru með show, update föll

---
# Pælingar
index.js heldur um allt og inniheldur draw loop og setup

vantar circle object og rectangle object, cup og string
### circle
circle: x,y,(w,h)/r,options,matterbody,update,show

circle.matterbody: by til body með matter og læt það í heiminn

circle.update: uppfærir staðsetningu og snúning útfrá matter bodyinu

circle.show: teikna með p5
### rectangle
rectangle: x,y,w,h,options,matterbody,update,show

rectangle.matterbody: by til body með matter og læt það í heiminn

rectangle.update: uppfærir staðsetningu og snúning útfrá matter bodyinu

rectangle.show: teikna með p5
### string
string: x,y,nodecount,nodesize,nodeoffset,nodes[],options,startnode,endnode,show

string.xy => x og y á start node, læt mús færa þennan

string.nodes[]: safn af circle objectum

string.startnode = string.nodes[0]

string.endnode = string.nodes[nodecount-1]

string.update = nodes.foreach.update()

string.show = nodes.foreach.show()
### cup
cup: x,y,cupw,cuph,wallw,options,walls[],show

cup.xy => x og y á botninum á miðjunni á bollanum, mús færir þaðan alveg eins og string startnode

cup.walls[]: [bottomWall,leftWall,rightWall]

cup.update = walls.foreach.update()

cup.show = walls.foreach.show()