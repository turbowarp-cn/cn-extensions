class mathandgeom {
    get COUSTVALUE() {
        return [
            {text:'E', value:'E'},
            {text:'PI', value:'PI'},
            {text:'SQRT2', value:'SQRT2'},
            {text:'SQRT1_2', value:'SQRT1_2'},
            {text:'LN2', value:'LN2'},
            {text:'LN10', value:'LN10'},
            {text:'LOG2E', value:'LOG2E'},
            {text:'LOG10E', value:'LOG10E'}
        ];
    }
    get BinaryTernary() {
        return [
            {text:'Binary', value:'Binary'},
            {text:'Ternary', value:'Ternary'}
        ];
    }

    getInfo(){
        return {
            id: 'mathandgeom',
            name: '运算与图形',
            color1: '#ff8829',
            color2: '#ff8829',
            blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4OS45NjAzNyIgaGVpZ2h0PSI4OS4zMjk0OCIgdmlld0JveD0iMCwwLDg5Ljk2MDM3LDg5LjMyOTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgxLjI4OTYzLC0xMjEuOTIwNTIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZkNGIxIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTE4Mi43MjY3MiwxNzcuNTA1ODhsNTUuNDAwMzcsLTMyLjU5NzQ3bC01MS4xMTE1OCwtMjEuMTc1MjV6IiBmaWxsPSIjZmY4ODI5IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjEwLDIxMHYtNjBoNjB2NjB6IiBmaWxsPSIjZmY4ODI5IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTIyMy42OTM3LDE2OC41ODU1OWwtMy41MTIxMywyNC44MzU3NSIvPjxwYXRoIGQ9Ik0yMjkuMjEyNzUsMTgwLjYyNzE2bDIwLjU3MTAzLC01Ljc2OTkyIi8+PHBhdGggZD0iTTI0Mi41MDg2NiwxNjguNTg1NTlsLTQuMDEzODYsMjIuMDc2MjMiLz48cGF0aCBkPSJNMjU5LjgxODQzLDE2NC41NzE3M2wtMC41MDE3NCwzMC44NTY1NCIvPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo1OC43MTAzNjkwNTY1NTA5NDU6NTguMDc5NDgxMjA1ODMwNTMtLT4=',
            menuIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4OS45NjAzNyIgaGVpZ2h0PSI4OS4zMjk0OCIgdmlld0JveD0iMCwwLDg5Ljk2MDM3LDg5LjMyOTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgxLjI4OTYzLC0xMjEuOTIwNTIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZkNGIxIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTE4Mi43MjY3MiwxNzcuNTA1ODhsNTUuNDAwMzcsLTMyLjU5NzQ3bC01MS4xMTE1OCwtMjEuMTc1MjV6IiBmaWxsPSIjZmY4ODI5IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjEwLDIxMHYtNjBoNjB2NjB6IiBmaWxsPSIjZmY4ODI5IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTIyMy42OTM3LDE2OC41ODU1OWwtMy41MTIxMywyNC44MzU3NSIvPjxwYXRoIGQ9Ik0yMjkuMjEyNzUsMTgwLjYyNzE2bDIwLjU3MTAzLC01Ljc2OTkyIi8+PHBhdGggZD0iTTI0Mi41MDg2NiwxNjguNTg1NTlsLTQuMDEzODYsMjIuMDc2MjMiLz48cGF0aCBkPSJNMjU5LjgxODQzLDE2NC41NzE3M2wtMC41MDE3NCwzMC44NTY1NCIvPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo1OC43MTAzNjkwNTY1NTA5NDU6NTguMDc5NDgxMjA1ODMwNTMtLT4=',
            blocks: [
                {
                    opcode: 'coustValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | 常量 [VALUE]',
                    arguments: {
                        VALUE: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'coustvalue',
                            defaultValue: 'PI'
                        },
                    },
                    disableMonitor: true,
                },
                {
                    opcode: 'pow',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | [NUM] 的 [NUM2] 次方',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '11'
                        },
                        NUM2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '4'
                        },
                    }
                },
                {
                    opcode: 'round',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | 四舍五入 [NUM] 到第 [NUM2] 位',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1.135'
                        },
                        NUM2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2'
                        },
                    }
                },
                {
                    opcode: 'primenum',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '运算 | [NUM] 是质数？',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2'
                        },
                    }
                },
                {
                    opcode: 'gcd',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | [NUM] 和 [NUM2] 的最大公因数',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2'
                        },
                        NUM2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '4'
                        },
                    }
                },
                {
                    opcode: 'lcm',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | [NUM] 和 [NUM2] 的最小公倍数',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2'
                        },
                        NUM2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '4'
                        },
                    }
                },
                {
                    opcode: 'numbaseconv',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | 将 [NUM] 进制的 [NUM2] 转换成 [NUM3] 进制（请注意进制的范围是2-36进制）',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        NUM2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '114'
                        },
                        NUM3: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '16'
                        },
                    }
                },
                {
                    opcode: 'factorial',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | [NUM] 的阶乘',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                    }
                },
                {
                    opcode: 'oneton',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | 1到 [NUM] 的和',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '100'
                        },
                    }
                },
                {
                    opcode: 'onetoonen',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | 1到 1/ [NUM] 的和',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                    }
                },
                {
                    opcode: 'solveQuadratic',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | [A] x^2+ [B] x+[C] =0的根',
                    arguments: {
                        A: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        B: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '2'
                        },
                        C: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-3'
                        },
                    }
                },
                {
                    opcode: 'findNthRoot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | [N] 的 [M] 次根',
                    arguments: {
                        N: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '8'
                        },
                        M: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '3'
                        },

                    }
                },
                {
                    opcode: 'binaryTernary_SearchGuesses',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '运算 | 用 [WAY] 从 [N] 到 [M] 猜到 [NUM] 的次数',
                    arguments: {
                        N: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        M: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        WAY: {
                            type: Scratch.ArgumentType.NUMBER,
                            menu: 'BinaryTernary',
                            defaultValue: 'Binary'
                        },
                    }
                },

                {
                    opcode: 'distance',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '图形 | x [X] y [Y] 到 x [X2] y [Y2] 的距离',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        Y2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                    }
                },
                {
                    opcode: 'distance_three_dimensional',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '图形 | x [X] y [Y] z [Z] 到 x [X2] y [Y2] z[Z2] 的距离',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Z: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        Y2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        Z2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                    }
                },
                {
                    opcode: 'direction',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '图形 | x [X] y [Y] 朝向 x [X2] y [Y2] 的方向',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        Y2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                    }
                },
                {
                    opcode: 'intersect',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '图形 | 从 x [X] y [Y] 到 x [X2] y [Y2] 的线段和 从 x [X3] y [Y3] 到 x [X4] y [Y4] 的线段是否相交',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-1'
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        X2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        Y2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-1'
                        },
                        X3: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        Y3: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        X4: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-1'
                        },
                        Y4: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-1'
                        },
                    },
                },
                {
                    opcode: 'intersect_coordinates',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '图形 | 从 x [X] y [Y] 到 x [X2] y [Y2] 的线段和 从 x [X3] y [Y3] 到 x [X4] y [Y4] 的线段的相交点坐标',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-1'
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        X2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        Y2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-1'
                        },
                        X3: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        Y3: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        X4: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-1'
                        },
                        Y4: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '-1'
                        },
                    },
                },
                {
                    opcode: 'point_In_Circle',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '图形 | 位于 x [X] y [Y] 的点是否在 位于 x [RX] y [RY] ，半径是 [r] 的圆里？（包括圆上）',
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '5'
                        },
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        RX: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        RY: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        r: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '5'
                        },
                    },
                },
            ],
            menus: {
                coustvalue: this.COUSTVALUE,
                BinaryTernary: this.BinaryTernary
            }
        };
    }

    coustValue(args){
        switch (args.VALUE) {
            case 'E':
                return Math.E;
            case 'PI':
                return Math.PI;
            case 'SQRT2':
                return Math.SQRT2;
            case 'SQRT1_2':
                return Math.SQRT1_2;
            case 'LN2':
                return Math.LN2;
            case 'LN10':
                return Math.LN10;
            case 'LOG2E':
                return Math.LOG2E;
            case 'LOG10E':
                return Math.LOG10E;
        }
    }
    pow(args){
        return Math.pow(Number(args.NUM),Number(args.NUM2));
    }
    round(args){
        var num=Number(args.NUM);
        var num2=Number(args.NUM2);
        return Math.round(num*Math.pow(10,num2))/Math.pow(10,num2);
    }
    primenum(args){
        var num=Number(args.NUM);
        if(num==1) return 1==0;
        if(num==2) return 1==1;
        for(var i=2;i<num;i++){
            if(num%i==0) return 1==0;
        }
        return 1==1;
    }
    gcd(args){
        var a=Number(args.NUM);
        var b=Number(args.NUM2);
        while(a!=b){
            if(a>b) a=a-b;
            else b=b-a;
        }
        return a;
    }
    lcm(args){
        var a=Number(args.NUM);
        var b=Number(args.NUM2);
        var c=a;
        var d=b;
        while(a!=b){
            if(a>b) a=a-b;
            else b=b-a;
        }
        return c*d/a;
    }
    numbaseconv(args){
        var base1=Number(args.NUM);
        var base2=Number(args.NUM3);
        var num=Number(args.NUM2);
        return parseInt(num,base1).toString(base2);
    }
    factorial(args){
        var a=1;
        var n=Number(args.NUM);
        for(var i=1;i<=n;i++) a*=i;
        return a;
    }
    oneton(args){
        var a=0;
        var n=Number(args.NUM);
        for(var i=1;i<=n;i++) a+=i;
        return a;
    }
    onetoonen(args){
        var a=0;
        var n=Number(args.NUM);
        for(var i=1;i<=n;i++) a+=1/i;
        return a;
    }
    solveQuadratic(args){
        var a=Number(args.A);
        var b=Number(args.B);
        var c=Number(args.C);
        let discriminant=(b*b) - (4*a*c); 
        if(discriminant<0) return 'nothing';

        let root1=(-b+Math.sqrt(discriminant))/(2*a); 
        let root2=(-b-Math.sqrt(discriminant))/(2*a); 

        return String(root1)+" "+String(root2); 
    }
    findNthRoot(args) { 
        return Math.pow(Number(args.N), 1/Number(args.M)); 
    }

    distance(args){
        var x=Number(args.X);
        var y=Number(args.Y);
        var x2=Number(args.X2);
        var y2=Number(args.Y2);
        return Math.sqrt((x-x2)*(x-x2)+(y-y2)*(y-y2));
    }
    distance_three_dimensional(args){
        var x=Number(args.X);
        var y=Number(args.Y);
        var z=Number(args.Z);
        var x2=Number(args.X2);
        var y2=Number(args.Y2);
        var z2=Number(args.Z2);
        return Math.sqrt((x-x2)*(x-x2)+(y-y2)*(y-y2)+(z-z2)*(z-z2));
    }
    direction(args){
        var x=Number(args.X);
        var y=Number(args.Y);
        var x2=Number(args.X2);
        var y2=Number(args.Y2);
        return Math.atan2((y2-y),(x2-x))*180/Math.PI;
    }
    intersect(args){
        var x=Number(args.X);
        var y=Number(args.Y);
        var x2=Number(args.X2);
        var y2=Number(args.Y2);
        var x3=Number(args.X3);
        var y3=Number(args.Y3);
        var x4=Number(args.X4);
        var y4=Number(args.Y4);

        var p1={x:x,y:y};
        var p2={x:x2,y:y2};
        var p3={x:x3,y:y3};
        var p4={x:x4,y:y4};

        var v1={x:p1.x-p3.x,y:p1.y-p3.y};  
        var v2={x:p2.x-p3.x,y:p2.y-p3.y};  
        var v3={x:p4.x-p3.x,y:p4.y-p3.y};  
        var v=(v1.x*v3.y-v1.y*v3.x)*(v2.x*v3.y-v2.y*v3.x);
        var v1={x:p3.x-p1.x,y:p3.y-p1.y};  
        var v2={x:p4.x-p1.x,y:p4.y-p1.y};  
        var v3={x:p2.x-p1.x,y:p2.y-p1.y};  
        return (v<=0&&(v1.x*v3.y-v1.y*v3.x)*(v2.x*v3.y-v2.y*v3.x)<=0)?true:false;
    }
    intersect_coordinates(args){
        var x=Number(args.X);
        var y=Number(args.Y);
        var x2=Number(args.X2);
        var y2=Number(args.Y2);
        var x3=Number(args.X3);
        var y3=Number(args.Y3);
        var x4=Number(args.X4);
        var y4=Number(args.Y4);

        var a={x:x,y:y};
        var b={x:x2,y:y2};
        var c={x:x3,y:y3};
        var d={x:x4,y:y4};

        var deno=(b.y-a.y)*(d.x-c.x)-(a.x-b.x)*(c.y-d.y);
        if(deno==0) return 'nothing';

        var x=((b.x-a.x)*(d.x-c.x)*(c.y-a.y)+(b.y-a.y)*(d.x-c.x)*a.x-(d.y-c.y)*(b.x-a.x)*c.x)/deno;
        var y=0-((b.y-a.y)*(d.y-c.y)*(c.x-a.x)+(b.x-a.x)*(d.y-c.y)*a.y-(d.x-c.x)*(b.y-a.y)*c.y)/deno;
        if((x-a.x)*(x-b.x)<=0&&(y-a.y)*(y-b.y)<=0&&(x-c.x)*(x-d.x)<=0&&(y-c.y)*(y-d.y)<=0) return [x,y];

        return 'nothing';
    }
    point_In_Circle(args){
        var x=Number(args.X);
        var y=Number(args.Y);
        var rx=Number(args.RX);
        var ry=Number(args.RY);
        var r=Number(args.r);
        if(r==0) return 1==0;
        var dx=rx-x;
        var dy=ry-y;
        return (((dx*dx)+(dy*dy)<=r*r));
    }
    binaryTernary_SearchGuesses(args){
        if(args.WAY==="Binary"){
            var N=Number(args.N);
            var M=Number(args.M);
            var NUM=Number(args.NUM);
            var low=N;
            var high=M;
            var mid;
            var count=0;
            while(low<=high){
                mid=Math.floor((low+high)/2);
                count++;
                if(mid===NUM) return count;
                else if(mid<NUM) low=mid+1;
                else high=mid-1;
            }
        }else if(args.WAY==="Ternary"){
            var N=Number(args.N);
            var M=Number(args.M);
            var NUM=Number(args.NUM);
            var low=N;
            var high=M;
            var mid1,mid2;
            var count=0;
            while(low<=high){
                mid1=low+(high-low)/3;
                mid2=high-(high-low)/3;
                count+=2;
                if(mid1===NUM) return count;
                else if(mid2===NUM) return count+1;
                else if(mid1<NUM) low=mid1+1;
                else if(mid2>NUM) high=mid2-1;
                else low=mid1+1,high=mid2-1;
            }
        }
        return -1;
    }

}

Scratch.extensions.register(new mathandgeom());