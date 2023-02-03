import vt from '../glsl/base.vert';
import fg from '../glsl/dest.frag';
import { Object3D } from 'three/src/core/Object3D';
import { Mesh } from 'three/src/objects/Mesh';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Vector3 } from 'three/src/math/Vector3';
import { DoubleSide } from 'three/src/constants';
import { Texture } from 'three/src/textures/Texture';

export class Dest extends Object3D {

  private _mesh:Mesh

  constructor(opt:{tex: Texture}) {
    super()

    this._mesh = new Mesh(
      new PlaneGeometry(1, 1),
      new ShaderMaterial({
        vertexShader:vt,
        fragmentShader:fg,
        transparent:true,
        side:DoubleSide,
        depthTest:false,
        uniforms:{
          tDiffuse:{value:opt.tex},
          alpha:{value:1},
        }
      })
    )
    this.add(this._mesh)
  }


  public getMesh():Mesh {
    return this._mesh
  }


  public getUni():any {
    return (this._mesh.material as ShaderMaterial).uniforms;
  }


  public setSize(size:number):void {
    this._mesh.scale.set(size, size, 1)
  }

  public getSize():Vector3 {
    return this._mesh.scale
  }
}