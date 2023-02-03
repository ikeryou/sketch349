import vt from '../glsl/base.vert';
import fg from '../glsl/dest2.frag';
import { Mesh } from 'three/src/objects/Mesh';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Vector3 } from 'three/src/math/Vector3';
import { Vector2 } from 'three/src/math/Vector2';
import { DoubleSide } from 'three/src/constants';
import { Texture } from 'three/src/textures/Texture';
import { MyObject3D } from "../webgl/myObject3D";
import { MousePointer } from '../core/mousePointer';
import { Func } from '../core/func';
import { Tween } from '../core/tween';
import { Util } from '../libs/util';
import { Scroller } from '../core/scroller';
import { Param } from '../core/param';

export class Dest2 extends MyObject3D {

  private _mesh:Mesh;
  private _heightEl: HTMLElement = document.querySelector('.js-height') as HTMLElement;

  constructor(opt:{texA: Texture, texB: Texture}) {
    super()

    const range = 0.6;
    const offset = 0.01;

    this._mesh = new Mesh(
      new PlaneGeometry(1, 1),
      new ShaderMaterial({
        vertexShader:vt,
        fragmentShader:fg,
        transparent:true,
        side:DoubleSide,
        depthTest:false,
        uniforms:{
          tA:{value:opt.texA},
          tB:{value:opt.texB},
          maskStartA:{value:new Vector2((1 - range) * 0.5 + offset, (1 - range) * 0.5 + offset)},
          maskEndA:{value:new Vector2((1 - range) * 0.5 + offset + range, (1 - range) * 0.5 + offset + range)},
          maskStartB:{value:new Vector2((1 - range) * 0.5 - offset, (1 - range) * 0.5 - offset)},
          maskEndB:{value:new Vector2((1 - range) * 0.5 - offset + range, (1 - range) * 0.5 - offset + range)},
          maskStartC:{value:new Vector2((1 - range) * 0.5 - offset, (1 - range) * 0.5 - offset)},
          maskEndC:{value:new Vector2((1 - range) * 0.5 - offset + range, (1 - range) * 0.5 - offset + range)},
          alpha:{value:1},
        }
      })
    )
    this.add(this._mesh)
  }


  protected _update():void {
    super._update();

    const sh = Func.instance.sh();
    const totalH = sh * 5;

    Tween.instance.set(this._heightEl, {
      height: totalH
    });

    const scrollRate = Util.instance.map(Scroller.instance.val.y, 0, 1, 0, totalH - sh);
    Param.instance.scrollRate = scrollRate;

    const mx = MousePointer.instance.easeNormal.x;
    const my = MousePointer.instance.easeNormal.y;

    const uni = this._getUni(this._mesh);

    const range = Util.instance.map(scrollRate, 0.6, 0.6, 0, 1);
    const offsetX = mx * -0.1;
    const offsetY = my * 0.1;

    uni.maskStartA.value = new Vector2((1 - range) * 0.5 + offsetX, (1 - range) * 0.5 + offsetY);
    uni.maskEndA.value = new Vector2((1 - range) * 0.5 + offsetX + range, (1 - range) * 0.5 + offsetY + range);
    uni.maskStartB.value = new Vector2((1 - range) * 0.5 - offsetX, (1 - range) * 0.5 - offsetY);
    uni.maskEndB.value = new Vector2((1 - range) * 0.5 - offsetX + range, (1 - range) * 0.5 - offsetY + range);
    uni.maskStartC.value = new Vector2((1 - range) * 0.5, (1 - range) * 0.5);
    uni.maskEndC.value = new Vector2((1 - range) * 0.5 + range, (1 - range) * 0.5 + range);
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