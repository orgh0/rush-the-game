var z_pos_ortho = -45;

function cubeBuffer(gl)
{
  var indice_temp1 = 0;
  const positionBuffer = gl.createBuffer();
  var j = 0;
  var color_val = 1.00
  var pos_val = 1.00
  var colors = [];
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [
   
    -1.0* pos_val, -1.0* pos_val,  1.0* pos_val,
     1.0* pos_val, -1.0* pos_val,  1.0* pos_val,
     1.0* pos_val,  1.0* pos_val,  1.0* pos_val,
    -1.0* pos_val,  1.0* pos_val,  1.0* pos_val,

   
    -1.0* pos_val, -1.0* pos_val, -1.0* pos_val,
    -1.0* pos_val,  1.0* pos_val, -1.0* pos_val,
     1.0* pos_val,  1.0* pos_val, -1.0* pos_val,
     1.0* pos_val, -1.0* pos_val, -1.0* pos_val,

   
    -1.0* pos_val,  1.0* pos_val, -1.0* pos_val,
    -1.0* pos_val,  1.0* pos_val,  1.0* pos_val,
     1.0* pos_val,  1.0* pos_val,  1.0* pos_val,
     1.0* pos_val,  1.0* pos_val, -1.0* pos_val,

   
    -1.0* pos_val, -1.0* pos_val, -1.0* pos_val,
     1.0* pos_val, -1.0* pos_val, -1.0* pos_val,
     1.0* pos_val, -1.0* pos_val,  1.0* pos_val,
    -1.0* pos_val, -1.0* pos_val,  1.0* pos_val,

   
     1.0* pos_val, -1.0* pos_val, -1.0* pos_val,
     1.0* pos_val,  1.0* pos_val, -1.0* pos_val,
     1.0* pos_val,  1.0* pos_val,  1.0* pos_val,
     1.0* pos_val, -1.0* pos_val,  1.0* pos_val,

   
    -1.0* pos_val, -1.0* pos_val, -1.0* pos_val,
    -1.0* pos_val, -1.0* pos_val,  1.0* pos_val,
    -1.0* pos_val,  1.0* pos_val,  1.0* pos_val,
    -1.0* pos_val,  1.0* pos_val, -1.0* pos_val,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  const faceColors = [
    [1.0* color_val,  0.0 * color_val,  0.0 * color_val,  1.0* color_val],
    [1.0* color_val,  0.0 * color_val,  0.0 * color_val,  1.0* color_val],    
    [1.0* color_val,  0.0 * color_val,  0.0 * color_val,  1.0* color_val],
    [1.0* color_val,  0.0 * color_val,  0.0 * color_val,  1.0* color_val],   
    [1.0* color_val,  0.0 * color_val,  0.0 * color_val,  1.0* color_val],   
    [1.0* color_val,  0.0 * color_val,  0.0 * color_val,  1.0* color_val],   
  ];

  while(j < faceColors.length)
  {
    const c = faceColors[j];
    colors = colors.concat(c, c, c, c);
    j++
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  const indice_matrix = [
    0 + indice_temp1,  1 + indice_temp1,  2 + indice_temp1,      0 + indice_temp1,  2 + indice_temp1,  3 + indice_temp1,   
    4 + indice_temp1,  5 + indice_temp1,  6 + indice_temp1,      4 + indice_temp1,  6 + indice_temp1,  7 + indice_temp1,   
    8 + indice_temp1,  9 + indice_temp1,  10 + indice_temp1,     8 + indice_temp1,  10 + indice_temp1, 11 + indice_temp1,  
    12 + indice_temp1, 13 + indice_temp1, 14 + indice_temp1,     12 + indice_temp1, 14 + indice_temp1, 15 + indice_temp1,  
    16 + indice_temp1, 17 + indice_temp1, 18 + indice_temp1,     16 + indice_temp1, 18 + indice_temp1, 19 + indice_temp1,  
    20 + indice_temp1, 21 + indice_temp1, 22 + indice_temp1,     20 + indice_temp1, 22 + indice_temp1, 23 + indice_temp1,  
  ];
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indice_matrix), gl.STATIC_DRAW);
  return {
    position: positionBuffer,
    color: colorBuffer,
    indice_matrix: indexBuffer,
  };
}

function cubeDraw(gl, programInfo, buffers, deltaTime) 
{
  const fieldOfView = 45 * Math.PI / 180;  
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, ypos, z_pos_ortho + zpos]); 
  mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotationo, [0, 0, 1]);      
  mat4.scale(modelViewMatrix, modelViewMatrix, [.1, 1 , .1]); 
  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, 4, g.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indice_matrix);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
  {
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  }

  if(zpos > -1 * (z_pos_ortho))
  {
    z_pos_ortho -= 50;
    var a = (Math.random() * 360)
    var b = (2 * Math.PI / 360.0)
    cubeRotationo = a * b; 
  }
  cubeRotationo += (-1 * z_pos_ortho - 50) / 2500.0
  var temp1 = zpos + z_pos_ortho
  var temp2 = cubeRotationo * (180.0 / Math.PI)

  if(temp1 > -0.3)
  {
    if((temp2) % 180 > 160 || (temp2) % 180 < 20 || keypressed == 1)
      {
        zspeed = -0.2;
        life -= 100;
        lifetag = document.getElementById("life");
        lifetag.innerHTML = "Life:" + life;
      }
  }  
}