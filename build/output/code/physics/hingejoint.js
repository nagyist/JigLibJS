(function(c){var f=c.Vector3DUtil;var b=c.JMatrix3D;var d=c.JNumber3D;var g=c.PhysicsController;var e=c.JConstraintMaxDistance;var a=c.JConstraintPoint;var h=function(v,s,y,D,m,p,j,J,l){this._body0=v;this._body1=s;this._hingeAxis=y.slice(0);this._hingePosRel0=D.slice(0);this._usingLimit=false;this._hingeEnabled=false;this._broken=false;this._damping=l;this._extraTorque=0;f.normalize(this._hingeAxis);var k=f.add(this._body0.get_currentState().position,f.subtract(this._hingePosRel0,this._body1.get_currentState().position));var r=f.add(this._hingePosRel0,d.getScaleVector(this._hingeAxis,m));var q=f.subtract(this._hingePosRel0,d.getScaleVector(this._hingeAxis,m));var G=f.add(k,d.getScaleVector(this._hingeAxis,m));var E=f.subtract(k,d.getScaleVector(this._hingeAxis,m));var u=1/20;var B=0.005;var n=J*m;this.sidePointConstraints=[];this.sidePointConstraints[0]=new e(this._body0,r,this._body1,G,n);this.sidePointConstraints[1]=new e(this._body0,q,this._body1,E,n);this.midPointConstraint=new a(this._body0,this._hingePosRel0,this._body1,k,B,u);if(p<=this.MAX_HINGE_ANGLE_LIMIT){var i=f.Y_AXIS;if(f.dotProduct(i,this._hingeAxis)>0.1){i[0]=1;i[1]=0;i[2]=0;}var x=f.crossProduct(this._hingeAxis,i);i=f.crossProduct(x,this._hingeAxis);f.normalize(i);var F=10*m;var C=d.getScaleVector(i,F);var I=0.5*(p-j);var A=C.slice(0);b.multiplyVector(b.getRotationMatrix(this._hingeAxis[0],this._hingeAxis[1],this._hingeAxis[2],-I),A);var w=0.5*(p+j);var t=F*2*Math.sin(0.5*w*Math.PI/180);var H=f.add(this._body1.get_currentState().position,this._hingePosRel0);var o=f.add(H,f.subtract(C,this._body0.get_currentState().position));var z=f.add(H,f.subtract(A,this._body1.get_currentState().position));this.maxDistanceConstraint=new e(this._body0,o,this._body1,z,t);this._usingLimit=true;}if(this._damping<=0){this._damping=-1;}else{this._damping=d.getLimiteNumber(this._damping,0,1);}this.enableHinge();};c.extend(h,c.PhysicsController);h.prototype.MAX_HINGE_ANGLE_LIMIT=150;h.prototype._hingeAxis=null;h.prototype._hingePosRel0=null;h.prototype._body0=null;h.prototype._body1=null;h.prototype._usingLimit=null;h.prototype._hingeEnabled=null;h.prototype._broken=null;h.prototype._damping=null;h.prototype._extraTorque=null;h.prototype.sidePointConstraints=null;h.prototype.midPointConstraint=null;h.prototype.maxDistanceConstraint=null;h.prototype.enableHinge=function(){if(this._hingeEnabled){return;}this.midPointConstraint.enableConstraint();this.sidePointConstraints[0].enableConstraint();this.sidePointConstraints[1].enableConstraint();if(this._usingLimit&&!this._broken){this.maxDistanceConstraint.enableConstraint();}this.enableController();this._hingeEnabled=true;};h.prototype.disableHinge=function(){if(!this._hingeEnabled){return;}this.midPointConstraint.disableConstraint();this.sidePointConstraints[0].disableConstraint();this.sidePointConstraints[1].disableConstraint();if(this._usingLimit&&!this._broken){this.maxDistanceConstraint.disableConstraint();}this.disableController();this._hingeEnabled=false;};h.prototype.breakHinge=function(){if(this._broken){return;}if(this._usingLimit){this.maxDistanceConstraint.disableConstraint();}this._broken=true;};h.prototype.mendHinge=function(){if(!this._broken){return;}if(this._usingLimit){this.maxDistanceConstraint.enableConstraint();}this._broken=false;};h.prototype.setExtraTorque=function(i){this._extraTorque=i;};h.prototype.getHingeEnabled=function(){return this._hingeEnabled;};h.prototype.isBroken=function(){return this._broken;};h.prototype.getHingePosRel0=function(){return this._hingePosRel0;};h.prototype.updateController=function(j){if(this._damping>0){var k=f.subtract(this._body1.get_currentState().rotVelocity,this._body0.get_currentState().rotVelocity);f.normalize(k);var p=f.dotProduct(this._body0.get_currentState().rotVelocity,k);var o=f.dotProduct(this._body1.get_currentState().rotVelocity,k);var m=0.5*(p+o);var i=1-this._damping;var r=m+(p-m)*i;var q=m+(o-m)*i;var n=f.add(this._body0.get_currentState().rotVelocity,d.getScaleVector(k,r-p));var l=f.add(this._body1.get_currentState().rotVelocity,d.getScaleVector(k,q-o));this._body0.setAngVel(n);this._body1.setAngVel(l);}if(this._extraTorque!=0){var s=this._hingeAxis.slice(0);b.multiplyVector(this._body0.get_currentState().get_orientation(),s);s=d.getScaleVector(s,this._extraTorque);this._body0.addWorldTorque(s);this._body1.addWorldTorque(d.getScaleVector(s,-1));}};c.HingeJoint=h;})(jigLib);