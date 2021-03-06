import THREE from '../../shims/three/core.js';

/**
 * @author David Gossow - dgossow@willowgarage.com
 */

export class Axes extends THREE.Object3D {

  /**
   * An Axes object can be used to display the axis of a particular coordinate frame.
   *
   * @constructor
   * @param options - object with following keys:
   *
   *   * shaftRadius (optional) - the radius of the shaft to render
   *   * headRadius (optional) - the radius of the head to render
   *   * headLength (optional) - the length of the head to render
   */
  constructor(options) {
    super();
    var that = this;
    options = options || {};
    var shaftRadius = options.shaftRadius || 0.008;
    var headRadius = options.headRadius || 0.023;
    var headLength = options.headLength || 0.1;


    // create the cylinders for the objects
    this.lineGeom = new THREE.CylinderGeometry(shaftRadius, shaftRadius, 1.0 - headLength);
    this.headGeom = new THREE.CylinderGeometry(0, headRadius, headLength);

    /**
     * Adds an axis marker to this axes object.
     *
     * @param axis - the 3D vector representing the axis to add
     */
    function addAxis(axis) {
      // set the color of the axis
      var color = new THREE.Color();
      color.setRGB(axis.x, axis.y, axis.z);
      var material = new THREE.MeshBasicMaterial({
        color : color.getHex()
      });

      // setup the rotation information
      var rotAxis = new THREE.Vector3();
      rotAxis.crossVectors(axis, new THREE.Vector3(0, -1, 0));
      var rot = new THREE.Quaternion();
      rot.setFromAxisAngle(rotAxis, 0.5 * Math.PI);

      // create the arrow
      var arrow = new THREE.Mesh(that.headGeom, material);
      arrow.position.copy(axis);
      arrow.position.multiplyScalar(0.95);
      arrow.quaternion.copy(rot);
      arrow.updateMatrix();
      that.add(arrow);

      // create the line
      var line = new THREE.Mesh(that.lineGeom, material);
      line.position.copy(axis);
      line.position.multiplyScalar(0.45);
      line.quaternion.copy(rot);
      line.updateMatrix();
      that.add(line);
    }

    // add the three markers to the axes
    addAxis(new THREE.Vector3(1, 0, 0));
    addAxis(new THREE.Vector3(0, 1, 0));
    addAxis(new THREE.Vector3(0, 0, 1));
  };
}
