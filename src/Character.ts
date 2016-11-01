class Person{
    public PersonBitmap : egret.Bitmap;
    private IsIdle : boolean;
    private IsWalking : boolean;
    private GoRight : boolean = false;
    private GoLeft : boolean = false;
    private IdleOrWalkStateMachine : StateMachine;
    private LeftOrRightStateMachine : StateMachine;

    constructor(){
        this.PersonBitmap = new egret.Bitmap();
        this.PersonBitmap.width = 64;
        this.PersonBitmap.height = 64;
        this.IsIdle = true;
        this.IsWalking = false;
        this.IdleOrWalkStateMachine = new StateMachine();
        this.LeftOrRightStateMachine = new StateMachine();

    }

    public SetPersonBitmap(picture:egret.Bitmap){
        this.PersonBitmap = picture;
    }


    public SetIdle(set : boolean){
        this.IsIdle = set;
    }

    public GetIfIdle(): boolean{
        return this.IsIdle;
    }

    public SetWalk(set : boolean){
        this.IsWalking = set;
    }

    public GetIfWalk(): boolean{
        return this.IsWalking
    }

    public SetGoRight(){
        this.GoRight = true;
        this.GoLeft = false;
    }

    public GetIfGoRight(): boolean{
        return this.GoRight;
    }

    public SetGoLeft(){
        this.GoLeft = true;
        this.GoRight = false;
    }

    public GetIfGoLeft() : boolean{
        return this.GoLeft;
    }

    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public SetState(e : State , _tmain : Main){
        this.IdleOrWalkStateMachine.setState(e,_tmain);
    }

    public SetRightOrLeftState(e : State , _tmain : Main){
        this.LeftOrRightStateMachine.setState(e,_tmain);
    }


}

interface State{
    OnState(_tmain : Main);

    ExitState(_tmain : Main);

}

class PeopleState implements State{
      OnState(_tmain : Main){};

      ExitState(_tmain : Main){};
}

class StateMachine{
     CurrentState : State;

     setState( e : State , _tmain : Main){
        if( this.CurrentState != null){
           this.CurrentState.ExitState(_tmain);
        }
        this.CurrentState = e;
        this.CurrentState.OnState(_tmain);
     }
}


class IdleState implements PeopleState{

    OnState(_tmain : Main){
        _tmain.Player.SetIdle(true);
        _tmain.Player.SetWalk(false);
    };

    ExitState(_tmain : Main){
        _tmain.Player.SetIdle(false);
    };

}

class WalkingState implements PeopleState{
      OnState(_tmain : Main){
        _tmain.Player.SetIdle(false);
        _tmain.Player.SetWalk(true);
    };

    ExitState(_tmain : Main){
        _tmain.Player.SetWalk(false);
    };
}

class GoRightState implements PeopleState{
    OnState(_tmain : Main){
        _tmain.Player.SetGoRight();
    };

    ExitState(_tmain : Main){};

}

class GoLeftState implements PeopleState{
    OnState(_tmain : Main){
        _tmain.Player.SetGoLeft();
    };

    ExitState(_tmain : Main){};

}
