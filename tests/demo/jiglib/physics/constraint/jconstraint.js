(function(a){var b=function(){this._constraintEnabled=false;this.enableConstraint();};b.prototype._satisfied=null;b.prototype._constraintEnabled=null;b.prototype.set_satisfied=function(c){this._satisfied=c;};b.prototype.get_satisfied=function(){return this._satisfied;};b.prototype.preApply=function(c){this._satisfied=false;};b.prototype.apply=function(c){return false;};b.prototype.enableConstraint=function(){if(this._constraintEnabled){return;}this._constraintEnabled=true;a.PhysicsSystem.getInstance().addConstraint(this);};b.prototype.disableConstraint=function(){if(!this._constraintEnabled){return;}this._constraintEnabled=false;a.PhysicsSystem.getInstance().removeConstraint(this);};b.prototype.get_constraintEnabled=function(){return this._constraintEnabled;};a.JConstraint=b;})(jigLib);