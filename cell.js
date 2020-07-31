//cell[][] grid;
function cell(i,j,w)
{    this.i=i;
    this.j=j;
    this.x=i*w;
    this.y=j*w;
    this.neighbourcount=0;
    this.w=w;
    /*if(random(1)<0.5)
    {
     this.mine=true;}
     else {this.mine=false;
    
    }*/
    this.mine=false;
    this.revealed=false;
}
cell.prototype.show=function()
{
    stroke(0);
    noFill();
    rect(this.x,this.y,this.w,this.w);
    if(this.revealed)
    {
        if(this.mine)
        {   fill(127);
            ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w*0.5);
        }
        else {
          fill(200);
        
        rect(this.x,this.y,this.w,this.w);
        if(this.neighbourcount>0)
        {
        textAlign(CENTER);
        fill(0);
        text(this.neighbourcount,this.x+this.w*0.5,this.y+this.w-6);
      }
    }
    }
}
cell.prototype.countmines=function()
{
    if(this.mine)
    {this.neighbourcount=-1;
    return;}
    
    var total=0;
    //var total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbour = grid[i][j];
      if (neighbour.mine) {
        total++;
      }
    }
  }
  this.neighbourcount = total;
}

cell.prototype.contains=function(x,y,w)
{
    return (x>this.x && x < this.x+this.w && y>this.y && y<this.y+this.w);
}
cell.prototype.reveal=function()
{
    this.revealed=true;
    //console.log(this.neighbourcount);
    if(this.neighbourcount==0)
    {
        this.floodfill();
    }
}
cell.prototype.floodfill=function()
{
    for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) 
      continue;
 for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows)
        continue;

      var neighbour = grid[i][j];
      
      if (!neighbour.revealed) {
        neighbour.reveal();
      }
    }
  }
}