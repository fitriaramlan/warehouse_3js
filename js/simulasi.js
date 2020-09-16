var camera, scene, renderer;
var ambientLight;
var canv;
var objStart,objEnd;
var objServer;
var stats;
var ukuranBox;
var ukuranBoxUtama;
var jumlah,waktu;
var smallmeshbox=[];
var pBox=[];
var banyakBox=216;
var ready=false;



$(document).ready(function()
{
 
	canv=$("#tampung");

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    canv.append( stats.domElement );
    setingPosisi();
    setingCamera(1200,1200,1200);
    setingScene();
    setingGrid();
    setingBox(600);
    ukuranBoxUtama=600;
    setCahaya(500);
    render();
    


$("#sim").live("click",function()
    {
        if (ready==false)
            {
                // hitung jumlah jenis box
                var jlhJenis = parseInt($("#jlhjeniskotak").val());
                var total=0;
                for (var i=0; i<jlhJenis; i++)
                    {
                        total=total + parseInt($("#ukuran"+i).attr("value"));
                    }
                if (total<=216)
                    {
                        //checkAndRemove();
                        var jenisWarna = [0xff0000,0x00ff00,0x0000ff];
                        for (var j=0; j<jlhJenis; j++)
                            {
                                addSmallBox(jenisWarna[j],parseInt($("#ukuran"+j).attr("value")));
                            }

                        animate();
                        ready=true;
                    }
                else
                    {
                        alert("Jumlah kotak tidak memenuhi kapasitas!");
                        $("#ukuran0").focus();
                    }
            }
        else
            {
                susun();
            }
    })

$("#btnJenisKotak").live("click",function()
    {
        var jlh = parseInt($("input[id=jlhjeniskotak]").val());
        $("#deskkotak").html("");
        $("#deskkotak").append("<hr>");
        for (var i=0; i<jlh; i++)
            {
                $("#deskkotak").append("Jumlah kubus jenis 0"+(i+1)+":<input type='text' id='ukuran"+i+"' style='width:15px;' />&nbsp;&nbsp;");
            }
        $("#deskkotak").append("<hr>");

        $("#sim").fadeIn("slow");
    });

});

    function posSmallBox(x,y,z,terisi) 
    {
        this.x=x;
        this.y=y;
        this.z=z;
        this.terisi=terisi;
        this.warna=0;

    }

    function setingCamera(posZ,posY,posX)
    {
        camera = new THREE.PerspectiveCamera( 45, 1200/800, 0.1, 5000 );
        camera.position.z = posZ;
        camera.position.y=posY;
        camera.position.x=posX;
    }

    function setingScene()
    {
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0xff1231, 0.5 );
        camera.lookAt( scene.position );
    }

    function setingGrid()
    {
        // Grid

        var size = 500, step = 100;

        var geoline = new THREE.Geometry();

        for ( var i = - size; i <= size; i += step ) 
            {

                geoline.vertices.push( new THREE.Vector3( - size, 0, i ) );
                geoline.vertices.push( new THREE.Vector3(   size, 0, i ) );

                geoline.vertices.push( new THREE.Vector3( i, 0, - size ) );
                geoline.vertices.push( new THREE.Vector3( i, 0,   size ) );

            }

        var matline = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 0.7 } );

        var line = new THREE.Line( geoline, matline );
        line.type = THREE.LinePieces;
        scene.add( line );
    }

    function setingBox(width)
    {
        // panjang, lebar dan tinggi kubus
        var geobox = new THREE.CubeGeometry( width,width,width );
        // warna kulit kubus
        var matbox = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
        // jadikan benda
        meshbox = new THREE.Mesh( geobox,  matbox );
        // tambahkan ke scene
        scene.add(meshbox);
        meshbox.position.y=width/2;

    }


    function setCahaya(jarakXYZ)
    {
        var pointLight = new THREE.PointLight( 0xFF0000);
        pointLight.position.set( jarakXYZ, jarakXYZ, jarakXYZ );
        pointLight.shadowCameraVisible = true;
        pointLight.castShadow=true;
        scene.add(pointLight);


    }

    function setGroup()
    {
        vGroup = new THREE.Object3D();
    }

    function checkAndRemove()
    {
        for (var i=0; i<=banyakBox; i++)
            {
                scene.remove(smallmeshbox[i]);
            }
    }

    function addSmallBox(jw,jlh)
    {
        for (var i=0; i<jlh; i++)
            {
                k=smallmeshbox.length;
                // tempatkan sembarang kubus pada gudang
                var posArray = cekPosisi();
                // panjang, lebar dan tinggi kubus kecil
                if (typeof posArray!=="undefined")
                    {
                        var smallgeobox = new THREE.CubeGeometry( 100,100,100 );
                        // warna kerangka kubus
                        var smallmatbox = new THREE.MeshBasicMaterial( { color: jw , wireframe: false } );
                        // jadikan benda kubus
                        smallmeshbox[k] = new THREE.Mesh( smallgeobox,  smallmatbox );
                        smallmeshbox[k].position.x=pBox[posArray].x;
                        smallmeshbox[k].position.y=pBox[posArray].y;
                        smallmeshbox[k].position.z=pBox[posArray].z;
                        pBox[posArray].terisi=true;
                        pBox[posArray].warna=jw;
                        scene.add(smallmeshbox[k]);
                        console.log(smallmeshbox[k].material.color.getHexString());
                    }
            }

    }

    function setSmallBox(from,to,delay,color,m)
    {
        var tween = new TWEEN.Tween(from).to(to,delay).start()
            .onComplete(function()
                {
                    smallmeshbox[m].material.color.setHex( color );
                    setTimeout(tunggu(5000000),5000000);
                    smallmeshbox[m].material.color.setHex( 0x00ffdd );
                });

    }

    function tunggu(count)
    {
        for (var j=1; j<=count; j++)
            {}
    }

    function cekPosisi()
    {
        var newPos;
        for (var i=0; i<10000; i++)
            {
                newPos = getRandomizer(0,pBox.length-1);
                if (pBox[newPos].terisi==false)
                    {
                        break;
                    }
                else
                    {
                        continue;
                    }
            }
        return newPos;
    }

    function render() 
    {

        renderer = new THREE.CanvasRenderer({ antialias:false, clearColor: 0x000000, clearAlpha:2, maxLights:5, stencil:true });
        renderer.setSize( canv.width(), canv.height() );
        renderer.setClearColor(0x666666, 2.0);
        canv.append(renderer.domElement);
        renderer.render( scene, camera );
    }

    function rendering()
    {
        //TWEEN.update();
        renderer.render( scene, camera );
        TWEEN.update();        
    }

    function animate() {


        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame(animate);

        rendering();
        stats.update();
    }


    function setingPosisi()
    {
                // batas x adalah -250 sd 250
                // batas y adalah 50 sd 550
                // batas z adalah -250 sd 250

        var i=0;
        for (var x=-250; x<=250; x=x+100)
            {
                for (var y=50; y<=550; y=y+100)
                    {
                        for (var z=-250; z<=250; z=z+100)
                            {
                                pBox[i] = new posSmallBox(x,y,z,false);
                                console.log("i="+i+"("+pBox[i].x+","+pBox[i].y+","+pBox[i].z+","+pBox[i].terisi+")");
                                i++;
                            }
                    }
            }
    }

    function getRandomizer(bottom, top) 
    {

        var min = bottom;
        var max = top;
        // and the formula is:
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    }

    function susun()
    {
        // algoritma hill climbing
        for (var x=250; x>=-250; x=x-100)
            {
                for (var z=-250; z<=250; z=z+100)
                    {
                        var pos=[];
                        var posisiBenar = [];
                        for (var y=50; y<=550; y=y+100)
                            {
                                for (var i=0; i<smallmeshbox.length; i++)
                                    {
                                        if (smallmeshbox[i].position.z==z && smallmeshbox[i].position.y==y && smallmeshbox[i].position.x==x)
                                            {   
                                                pos.push(i);
                                                break;
                                            }
                                    } 

                            }


                        // periksa warna merah lalu tumpukkan di urutan bawah kotak
                        // ========================================================
                        for (var l=0; l<pos.length; l++)
                            {
                                var warna = smallmeshbox[pos[l]].material.color.getHexString();
                                if (warna=="ff0000")
                                    {
                                        var pA = posisiBenar.length;
                                        posisiBenar.push({y:(pA*100)+50,idx:pos[l],idx:pos[l]});
                                    }
                            }
                        // periksa warna hijau lalu tumpukkan di urutan setelah warna merah
                        // ================================================================
                        for (var l=0; l<pos.length; l++)
                            {
                                var warna = smallmeshbox[pos[l]].material.color.getHexString();
                                if (warna=="00ff00")
                                    {
                                        var pA = posisiBenar.length;
                                        posisiBenar.push({y:(pA*100)+50,idx:pos[l]});
                                    }
                            }
                        // periksa warna biru lalu tumpukkan di urutan setelah warna hijau
                        // ================================================================
                        for (var l=0; l<pos.length; l++)
                            {
                                var warna = smallmeshbox[pos[l]].material.color.getHexString();
                                if (warna=="0000ff")
                                    {
                                        var pA = posisiBenar.length;
                                        posisiBenar.push({y:(pA*100)+50,idx:pos[l]});
                                    }
                            }

                        // pindahkan kota ke posisi yg ditentukan dlm array posisiBenar
                        for (var m=0; m<posisiBenar.length; m++)
                            {
                                var posB = posisiBenar[m];

                                pindah(smallmeshbox[posB["idx"]].position,{y:posB["y"]});
                            }
                    }
            }

    }



    function pindah(from,to)
    {
        var tween = new TWEEN.Tween(from).to(to,1000)
            .onComplete( function()
                {
                    setTimeout(tunggu(5000000),5000000);
                })
            .start();
    }
