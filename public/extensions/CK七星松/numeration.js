class numeration {
    getInfo(){
        return {
            id: 'numeration',
            name: '记数法',
            color1: '#51cc88',
            color2: '#51cc88',
            blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTUuMjYwNjUiIGhlaWdodD0iNjUuNzQ5OTciIHZpZXdCb3g9IjAsMCwxMTUuMjYwNjUsNjUuNzQ5OTciPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODIuMzY5NjgsLTE0Ny4xMjUwMikiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHN0cm9rZT0iIzVkZTg5YyIgc3Ryb2tlLXdpZHRoPSI1Ij48cGF0aCBkPSJNMjEyLjAwNDk1LDE2OC42NzY2NGMzLjAzMzk1LDUuOTMyMjcgLTAuMzEzNDksMTcuNTMyNjEgMC4zNjI5NiwyNC43OTEyMWMwLjU2MzQ3LDYuMDQ2MzMgMy41MDUwNCw2LjM2ODY3IDUuNTMyMDcsNy40NzExOGMxLjIwODM3LDAuNjU3MjMgLTIuNDk5MjcsLTAuODYzMDcgLTMuMzczNzMsLTIuMTY2MzFjLTEuMjk0NDcsLTEuOTI5MTkgLTIuMDk1NDksLTMuNzAwODQgLTMuMDU1NzIsLTMuNjA3MzhjLTIuNTcxMTYsMC4yNTAyNCAtMi44NjEzMSw1LjAwNDQ5IC05LjI2NTU3LDYuMTExM2MtMjEuNjkxNjYsMy43NDg4MyAtMTkuMDgyMzUsLTIxLjg0Mzc5IC0xMy4xNjY2NywtMzIuMjY2NjZjNS45MTU2OSwtMTAuNDIyODcgMjAuMzkzODksLTUuMzYzODggMjIuOTY2NjcsLTAuMzMzMzR6Ii8+PHBhdGggZD0iTTI1Ni44MDQ5NiwyMDAuNzc2NjRjMCwwIC04LjExMDIyLDMuODcxODMgLTE3LjcsMS42Yy0xMC41MDMyMiwtMi40ODgyMiAtMTMuNDQzNTQsLTE3LjM0OTIgLTYuOCwtMjUuMWM2LjY0MzU0LC03Ljc1MDggMjQuMTM1MTgsLTIuMDkyODEgMjQsLTEuNWMtMC4xMTk1MywwLjUyNDE3IC0xOS4yNDAzOCwtNi45OTcyNiAtMjQuMSwxLjljLTQuNzMyODksOC42NjUyMSAtNC40MTE1LC0xNi44NjUyNiAxLjYsLTIzLjljNi4wMTE1MSwtNy4wMzQ3NCAyMi41LC0zIDIyLjUsLTMiLz48cGF0aCBkPSJNMjcwLjA5MDY4LDE3OC43MDUyMWM5LjM1NTcyLC02LjM2MjYgMjUuOTU3MTMsLTAuMTEzODcgMjUsMTMuMjE0MjhjLTAuODkxNDMsMTIuNDEzMTEgLTYuMjEwMzYsMTguNTM3ODYgLTEyLjEzNDg1LDE4LjQ1NDY2Yy0yOS4xMjk0OSwtMC40MDkwOSAtNS4xNTA4NywtNTguMDk3NTEgLTUuMTUwODcsLTU4LjA5NzUxIi8+PC9nPjxnIHN0cm9rZT0iIzY2ZmZhYiIgc3Ryb2tlLXdpZHRoPSIxLjUiPjxwYXRoIGQ9Ik0yMTIuMzY3OTIsMTkzLjQ2Nzg1YzAuNTYzNDcsNi4wNDYzMyAzLjUwNTAzLDYuMzY4NjcgNS41MzIwNiw3LjQ3MTE4YzEuMjA4MzYsMC42NTcyMyAtMi40OTkyNywtMC44NjMwNiAtMy4zNzM3MywtMi4xNjYzYy0xLjI5NDQ2LC0xLjkyOTIgLTIuMDk1NDksLTMuNzAwODUgLTMuMDU1NzIsLTMuNjA3MzljLTIuNTcxMTcsMC4yNTAyNCAtMi44NjEzMSw1LjAwNDQ5IC05LjI2NTU3LDYuMTExM2MtMjEuNjkxNjYsMy43NDg4MyAtMTkuMDgyMzUsLTIxLjg0MzggLTEzLjE2NjY3LC0zMi4yNjY2N2M1LjkxNTY4LC0xMC40MjI4NyAyMC4zOTM4OSwtNS4zNjM4NyAyMi45NjY2NywtMC4zMzMzM2MzLjAzMzk1LDUuOTMyMjcgLTAuMzEzNDksMTcuNTMyNjEgMC4zNjI5NiwyNC43OTEyMXoiLz48cGF0aCBkPSJNMjU2LjgwNDk2LDIwMC43NzY2NGMwLDAgLTguMTEwMjIsMy44NzE4MyAtMTcuNywxLjZjLTEwLjUwMzIxLC0yLjQ4ODIyIC0xMy40NDM1NCwtMTcuMzQ5MiAtNi44LC0yNS4xYzYuNjQzNTQsLTcuNzUwOCAyNC4xMzUxOCwtMi4wOTI4MSAyNCwtMS41Yy0wLjExOTUzLDAuNTI0MTcgLTE5LjI0MDM4LC02Ljk5NzI2IC0yNC4xLDEuOWMtNC43MzI4OSw4LjY2NTIxIC00LjQxMTUsLTE2Ljg2NTI2IDEuNiwtMjMuOWM2LjAxMTUxLC03LjAzNDc0IDIyLjUsLTMgMjIuNSwtMyIvPjxwYXRoIGQ9Ik0yNzAuMDkwNjcsMTc4LjcwNTIxYzkuMzU1NzIsLTYuMzYyNiAyNS45NTcxMywtMC4xMTM4NiAyNSwxMy4yMTQyOWMtMC44OTE0MiwxMi40MTMxMSAtNi4yMTAzNSwxOC41Mzc4NSAtMTIuMTM0ODQsMTguNDU0NjVjLTI5LjEyOTQ5LC0wLjQwOTA5IC01LjE1MDg3LC01OC4wOTc1MSAtNS4xNTA4NywtNTguMDk3NTEiLz48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NTcuNjMwMzE5MTM3NDU5NjU6MzIuODc0OTc3NTA4MzU1MTktLT4=',
            menuIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMjIuNjY2NjciIGhlaWdodD0iMTIyLjY2NjY3IiB2aWV3Qm94PSIwLDAsMTIyLjY2NjY3LDEyMi42NjY2NyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3OC42NjY2NywtMTE4LjY2NjY2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xNzguNjY2NjcsMjQxLjMzMzMzdi0xMjIuNjY2NjdoMTIyLjY2NjY3djEyMi42NjY2N3oiIGZpbGw9IiM1MWNjODgiIHN0cm9rZT0iIzQ2YWY3NSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzVkZTg5YyIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0yMTIuMDA0OTUsMTY4LjY3NjY1YzMuMDMzOTUsNS45MzIyNyAtMC4zMTM0OSwxNy41MzI2MSAwLjM2Mjk2LDI0Ljc5MTIxYzAuNTYzNDcsNi4wNDYzMyAzLjUwNTA0LDYuMzY4NjcgNS41MzIwNyw3LjQ3MTE4YzEuMjA4MzcsMC42NTcyMyAtMi40OTkyNywtMC44NjMwNyAtMy4zNzM3MywtMi4xNjYzMWMtMS4yOTQ0NywtMS45MjkxOSAtMi4wOTU0OSwtMy43MDA4NCAtMy4wNTU3MiwtMy42MDczOGMtMi41NzExNiwwLjI1MDI0IC0yLjg2MTMxLDUuMDA0NDkgLTkuMjY1NTcsNi4xMTEzYy0yMS42OTE2NiwzLjc0ODgzIC0xOS4wODIzNSwtMjEuODQzNzkgLTEzLjE2NjY3LC0zMi4yNjY2NmM1LjkxNTY5LC0xMC40MjI4NyAyMC4zOTM4OSwtNS4zNjM4OCAyMi45NjY2NywtMC4zMzMzNHoiLz48cGF0aCBkPSJNMjU2LjgwNDk2LDIwMC43NzY2NWMwLDAgLTguMTEwMjIsMy44NzE4MyAtMTcuNywxLjZjLTEwLjUwMzIyLC0yLjQ4ODIyIC0xMy40NDM1NCwtMTcuMzQ5MiAtNi44LC0yNS4xYzYuNjQzNTQsLTcuNzUwOCAyNC4xMzUxOCwtMi4wOTI4MSAyNCwtMS41Yy0wLjExOTUzLDAuNTI0MTcgLTE5LjI0MDM4LC02Ljk5NzI2IC0yNC4xLDEuOWMtNC43MzI4OSw4LjY2NTIxIC00LjQxMTUsLTE2Ljg2NTI2IDEuNiwtMjMuOWM2LjAxMTUxLC03LjAzNDc0IDIyLjUsLTMgMjIuNSwtMyIvPjxwYXRoIGQ9Ik0yNzAuMDkwNjgsMTc4LjcwNTIyYzkuMzU1NzIsLTYuMzYyNiAyNS45NTcxMywtMC4xMTM4NyAyNSwxMy4yMTQyOGMtMC44OTE0MywxMi40MTMxMSAtNi4yMTAzNiwxOC41Mzc4NiAtMTIuMTM0ODUsMTguNDU0NjZjLTI5LjEyOTQ5LC0wLjQwOTA5IC01LjE1MDg3LC01OC4wOTc1MSAtNS4xNTA4NywtNTguMDk3NTEiLz48L2c+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjZmZmFiIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48cGF0aCBkPSJNMjEyLjM2NzkyLDE5My40Njc4NmMwLjU2MzQ3LDYuMDQ2MzMgMy41MDUwMyw2LjM2ODY3IDUuNTMyMDYsNy40NzExOGMxLjIwODM2LDAuNjU3MjMgLTIuNDk5MjcsLTAuODYzMDYgLTMuMzczNzMsLTIuMTY2M2MtMS4yOTQ0NiwtMS45MjkyIC0yLjA5NTQ5LC0zLjcwMDg1IC0zLjA1NTcyLC0zLjYwNzM5Yy0yLjU3MTE3LDAuMjUwMjQgLTIuODYxMzEsNS4wMDQ0OSAtOS4yNjU1Nyw2LjExMTNjLTIxLjY5MTY2LDMuNzQ4ODMgLTE5LjA4MjM1LC0yMS44NDM4IC0xMy4xNjY2NywtMzIuMjY2NjdjNS45MTU2OCwtMTAuNDIyODcgMjAuMzkzODksLTUuMzYzODcgMjIuOTY2NjcsLTAuMzMzMzNjMy4wMzM5NSw1LjkzMjI3IC0wLjMxMzQ5LDE3LjUzMjYxIDAuMzYyOTYsMjQuNzkxMjF6Ii8+PHBhdGggZD0iTTI1Ni44MDQ5NiwyMDAuNzc2NjVjMCwwIC04LjExMDIyLDMuODcxODMgLTE3LjcsMS42Yy0xMC41MDMyMSwtMi40ODgyMiAtMTMuNDQzNTQsLTE3LjM0OTIgLTYuOCwtMjUuMWM2LjY0MzU0LC03Ljc1MDggMjQuMTM1MTgsLTIuMDkyODEgMjQsLTEuNWMtMC4xMTk1MywwLjUyNDE3IC0xOS4yNDAzOCwtNi45OTcyNiAtMjQuMSwxLjljLTQuNzMyODksOC42NjUyMSAtNC40MTE1LC0xNi44NjUyNiAxLjYsLTIzLjljNi4wMTE1MSwtNy4wMzQ3NCAyMi41LC0zIDIyLjUsLTMiLz48cGF0aCBkPSJNMjcwLjA5MDY3LDE3OC43MDUyMmM5LjM1NTcyLC02LjM2MjYgMjUuOTU3MTMsLTAuMTEzODYgMjUsMTMuMjE0MjljLTAuODkxNDIsMTIuNDEzMTEgLTYuMjEwMzUsMTguNTM3ODUgLTEyLjEzNDg0LDE4LjQ1NDY1Yy0yOS4xMjk0OSwtMC40MDkwOSAtNS4xNTA4NywtNTguMDk3NTEgLTUuMTUwODcsLTU4LjA5NzUxIi8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjYxLjMzMzMzMzMzMzMzMzM0OjYxLjMzMzM0MzMzMzMzMzMzLS0+',
            blocks: [
                {
                    opcode: 'FEnumtoe',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '科学记数法 | 将十进制数 [NUM] 转换为科学记数法',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '114514'
                        }
                    }
                },
                {
                    opcode: 'FEetonum',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '科学记数法 | 将科学记数法 [STR] 转换为十进制数',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '1.14514e5'
                        }
                    }
                },
                {
                    opcode: 'LCNnumTol',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '字母记数法 | 将十进制数 [NUM] 转换为字母计数法',
                    arguments: {
                        NUM: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '114514'
                        }
                    }
                },
                {
                    opcode: 'LCNlTonum',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '科学记数法 | 将字母记数法 [STR] 转换为十进制数',
                    arguments: {
                        STR: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'GNKK'
                        }
                    }
                },
            ],
        };
    }

    FEnumtoe(args){
        var value=Number(args.NUM);
        var p=0;
        while(n>=10) n=n/10,p+=1;
        var n=value;
        if(n==0) return 0;
        if(n>1){
            if(n<10) return n;
            else while(n>10) n=n/10,p+=1;
            n=(Math.round(n*Math.pow(10,p)))/Math.pow(10,p);
        }else while(n<1) n=n*10,p-=1;
        return n+'e'+p;
    }
    FEetonum(args){
        var n=args.STR.split('e')[0];
        var p=args.STR.split('e')[1];
        return Number(n)*Math.pow(10,Number(p));
    }
    LCNnumTol(args){
        var num=Number(args.NUM);
        var strs='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var r='';
        while(num>0) r=strs[num%26]+r,num=Math.floor(num/26);
        return r;
    }
    LCNlTonum(args){
        var str=args.STR;
        var alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var r=0;
        for(var i=0;i<str.length;i++) r=r*26+alphabet.indexOf(str[i]);
        return r;
    }

}

Scratch.extensions.register(new numeration());