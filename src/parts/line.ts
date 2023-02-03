import vt from '../glsl/line.vert';
import fg from '../glsl/line.frag';
import { Mesh } from 'three/src/objects/Mesh';
import { Color } from 'three/src/math/Color';
import { Vector3 } from 'three/src/math/Vector3';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { MyObject3D } from "../webgl/myObject3D";
import { Func } from '../core/func';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';

export class Line extends MyObject3D {

  private _id: number;
  private _mesh: Array<Mesh> = [];
  private _noise: Array<Vector3> = [];

  constructor(opt: {geo: PlaneGeometry, id: number}) {
    super();

    this._id = opt.id;

    const num = 50
    for (let i = 0; i < num; i++) {
      this._noise.push(new Vector3(
        (this._id == 0 ? 0.35 : 2),
        1,
        1
      ));

      const mesh = new Mesh(
        opt.geo,
        new ShaderMaterial({
          vertexShader:vt,
          fragmentShader:fg,
          transparent:true,
          depthTest:false,
          uniforms:{
            color:{value:new Color(0xffffff)},
            alpha:{value: 0.5},
            radius:{value: 0},
            time:{value: opt.id * 2 + i * 10},
          }
        })
      );
      this.add(mesh);
      this._mesh.push(mesh);
    }
  }

  protected _update():void {
    super._update();

    // const s = Util.instance.map(Param.instance.scrollRate, 1.5, 0.5, 0, 1);
    const maxSize = Math.max(Func.instance.sw(), Func.instance.sh()) * 1;
    const sw = maxSize;
    const sh = maxSize;

    const hutosa = this._id == 0 ? 0.25 : 0.25;

    // this.scale.set(s, s, 1);

    this._mesh.forEach((val,i) => {
      const n = this._noise[i];

      val.scale.set((sw / this._mesh.length) * hutosa * n.x, sh, 1);
      val.position.x = i * (sw / this._mesh.length) - sw * 0.5 + (sw / this._mesh.length) * 0.5;

      if(this._id == 1) {
        val.position.x += val.scale.x * 0.65;
      }

      const uni = this._getUni(val);
      uni.time.value += 2;
      uni.radius.value = maxSize * 0.15;
    });
  }
}