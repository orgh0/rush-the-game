
var ypos = 0.753;
var yspeed = 0;
var y_acceleration = 0.152;
var g = 0.012;
var speed_val = 0.12


//Mouse bindings for the game
Mousetrap.bind('d',function()
{
    cubeRotation -= speed_val;
    cubeRotationo -= speed_val;   
})

Mousetrap.bind('a',function()
{
    cubeRotation += speed_val;
    cubeRotationo += speed_val;  
})

Mousetrap.bind('space', function()
{
    if(keypressed == 0) {
      yspeed += y_acceleration;
      keypressed = 1; 
    }
})

//creating the tunnel object
function tunnelBuffer(gl)
{
  var indice_temp = 0;
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var temp3 = 0;
  const null_val = 0
  var temp4 = 0;
  var c_mat;
  var colors = [];
  var s1 = 0;
  var e1 = 40;
  var s2 = 120;
  var e2 = 160;
  var s1_temp = s1*8;
  var e1_temp = e1*8;
  var s2_temp = s2*8;
  var e2_temp = e2*8;
  var h = 1;
  var s = (Math.sqrt(2.2) - 1) * h;
  var tunnel_matrix_val = 0.7
  const position_matrix = [

     s, h,  1.0 * tunnel_matrix_val,
    -s, h,  1.0 * tunnel_matrix_val,
     s, h, -1.0 * tunnel_matrix_val,
    -s, h, -1.0 * tunnel_matrix_val,

     s, h,  1.0 * tunnel_matrix_val,
     h, s,  1.0 * tunnel_matrix_val,
     s, h, -1.0 * tunnel_matrix_val,
     h, s, -1.0 * tunnel_matrix_val,

     h, s,  1.0 * tunnel_matrix_val,
     h,-s,  1.0 * tunnel_matrix_val,
     h, s, -1.0 * tunnel_matrix_val,
     h,-s, -1.0 * tunnel_matrix_val,

     h,-s,  1.0 * tunnel_matrix_val,
     s,-h,  1.0 * tunnel_matrix_val,
     h,-s, -1.0 * tunnel_matrix_val,
     s,-h, -1.0 * tunnel_matrix_val,

     s,-h,  1.0 * tunnel_matrix_val,
    -s,-h,  1.0 * tunnel_matrix_val,
     s,-h, -1.0 * tunnel_matrix_val,
    -s,-h, -1.0 * tunnel_matrix_val,

    -s,-h,  1.0 * tunnel_matrix_val,
    -h,-s,  1.0 * tunnel_matrix_val,
    -s,-h, -1.0 * tunnel_matrix_val,
    -h,-s, -1.0 * tunnel_matrix_val,

    -h,-s,  1.0 * tunnel_matrix_val,
    -h, s,  1.0 * tunnel_matrix_val,
    -h,-s, -1.0 * tunnel_matrix_val,
    -h, s, -1.0 * tunnel_matrix_val,

    -h, s,  1.0 * tunnel_matrix_val,
    -s, h,  1.0 * tunnel_matrix_val,
    -h, s, -1.0 * tunnel_matrix_val,
    -s, h, -1.0 * tunnel_matrix_val,

  ];
  var length_var = position_matrix.length;
  var ind = length_var;
  while(temp3 < 199 * 8)
  {
    for (var i = 0; i<4;i++)
    {
      position_matrix[ind] = position_matrix[ind - length_var];
      position_matrix[ind + 1] = position_matrix[ind + 1 - length_var];
      position_matrix[ind + 2] = position_matrix[ind + 2 - length_var] - 2;
      ind += 3;
    }
    temp3++;
  } 
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position_matrix), gl.STATIC_DRAW);
  var temp8 = 0;
  while(temp8 < 1600)
  {
    var math_temp = Math.floor(j/8);
    
    if(j >= s1_temp && j <= e1_temp || j > s2_temp && j < e2_temp)
    {
      if(math_temp % 2 == null_val && j%2 == null_val)
      {
        c_mat = [1.0, 1.0, 1.0, 1.0];
      }
      else if(math_temp % 2 != null_val && j%2 == null_val)
      {
        c_mat = [0, 0, 0, 1];
      }
      else if(math_temp % 2 != null_val && j%2 != null_val)
      { 
        c_mat = [1.0, 1.0, 1.0, 1.0];
      }
      else if(math_temp % 2 == null_val && j%2 != null_val)
      { 
        c_mat = [0, 0, 0, 1];  
      }
    }
    else
    {
        var temp_val1 = Math.random() * 256
        var temp_val2 = Math.random() * 256
        var temp_val3 = Math.random() * 256
        c_mat = [Math.floor(temp_val1) / 255.0, Math.floor(temp_val2) / 255.0, Math.floor(temp_val3) / 255.0, 1.0];
    }
    
    colors = colors.concat(c_mat, c_mat, c_mat, c_mat);
    temp8++;
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  const indices_matrix = [
    indice_temp,  1+indice_temp,  2+indice_temp,              1+indice_temp,  2+indice_temp,  3+indice_temp,    
    4+indice_temp,  5 + indice_temp,  6 + indice_temp,        5 + indice_temp,  6 + indice_temp,  7 + indice_temp,    
    8 + indice_temp,  9 + indice_temp,  10 + indice_temp,     9 + indice_temp,  10 + indice_temp, 11 + indice_temp,   
    12 + indice_temp, 13 + indice_temp, 14 + indice_temp,     13 + indice_temp, 14 + indice_temp, 15 + indice_temp,   
    16 + indice_temp, 17 + indice_temp, 18 + indice_temp,     17 + indice_temp, 18 + indice_temp, 19 + indice_temp,   
    20 + indice_temp, 21 + indice_temp, 22 + indice_temp,     21 + indice_temp, 22 + indice_temp, 23 + indice_temp,   
    24 + indice_temp, 25 + indice_temp, 26 + indice_temp,     25 + indice_temp, 26 + indice_temp, 27 + indice_temp,   
    28 + indice_temp, 29 + indice_temp, 30 + indice_temp,     29 + indice_temp, 30 + indice_temp, 31 + indice_temp,   
  ];
  var indlen = indices_matrix.length;
  var indind = indlen;
  for (var j= 0; j < 9552; j++)
  {
    indices_matrix[indlen] = indices_matrix[indlen - indind] + 32;
    indlen++;
  }
  
  console.log(indices_matrix.length);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices_matrix), gl.STATIC_DRAW);
  
  return {
    position: positionBuffer,
    color: colorBuffer,
    indices_matrix: indexBuffer,
  };
}

// Drawing the tunnel object
function tunnelDraw(gl, programInfo, buffers, deltaTime)
{
  distance_covered = document.getElementById("distance_covered");
  distance_covered.innerHTML = "Distance Covered :" + zpos;
  var pos_check_z = 300;
  var pos_check_y = 0.75;
  var z_speed_check = 0.2;
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  
  gl.clearDepth(1.0);                 
  gl.enable(gl.DEPTH_TEST);           
  gl.depthFunc(gl.LEQUAL);            
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const fieldOfView = 45 * Math.PI / 180;   
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, ypos, zpos]);  
  mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation, [0, 0, 1]);       
  
  zpos += zspeed;
  if(zspeed <= z_speed_check) zspeed += z_acceleration;

  if (zpos >= pos_check_z)
  {
    zpos = -1;
    z_pos_ortho = -50;
  }

  ypos -= yspeed;

  if (ypos < pos_check_y)
  {
    yspeed -= g;
  }

  else
  {
    yspeed = 0;
    ypos =  0.75;
    keypressed = 0;
  } 

  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices_matrix);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
  {
    gl.drawElements(gl.TRIANGLES, 9600, gl.UNSIGNED_SHORT, 0);
  }

}
