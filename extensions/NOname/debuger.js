((Scratch) => {
    'use strict';
    
    // v1.2: 更新内容 —— 修复窗口的一些显示 bug

    const { Cast, ArgumentType, BlockType } = Scratch;

    Scratch.translate.setup({
        "zh": {
            "debugger.extName": "调试器",
            "debugger.windowText": "控制台",
            "debugger.console": "控制台",
            "debugger.inputTip": "输入：",
            "debugger.showConsole": "打开控制台",
            "debugger.breakpoint": "断点",
            "debugger.breakpointAndLog": "断点并记录 [message]",
            "debugger.ifFalseBreakpoint": "如果 [boolean] 不成立就断点",
            "debugger.ifFalseBreakpointAndLog": "如果 [boolean] 不成立就断点并记录 [message]",
            "debugger.clearConsole": "清除控制台",
            "debugger.output": "控制台 [type] [message]",
            "debugger.log": "记录",
            "debugger.warn": "警告",
            "debugger.error": "错误",
            "debugger.outputWithColor": "输出 [color] 色的 [message]",
            "debugger.test": "测试 [boolean] 如果假： [message]",
            "debugger.logStage": "记录舞台图片",
            "debugger.whenInput": "当输入",
            "debugger.getLastInput": "最后一次输入"
        },
        "zh-tw": {
            "debugger.extName": "偵錯器",
            "debugger.windowText": "主控台",
            "debugger.console": "主控台",
            "debugger.inputTip": "輸入：",
            "debugger.showConsole": "開放主控台",
            "debugger.breakpoint": "中斷點",
            "debugger.breakpointAndLog": "中斷併記錄 [message]",
            "debugger.ifFalseBreakpoint": "如果 [boolean] 不成立就中斷",
            "debugger.ifFalseBreakpointAndLog": "如果 [boolean] 不成立就中斷併記錄 [message]",
            "debugger.clearConsole": "清除主控台",
            "debugger.output": "主控台 [type] [message]",
            "debugger.log": "記錄",
            "debugger.warn": "警告",
            "debugger.error": "錯誤",
            "debugger.outputWithColor": "輸出 [color] 顔色的 [message]",
            "debugger.test": "測驗 [boolean] 如果假： [message]",
            "debugger.logStage": "記錄舞台圖像",
            "debugger.whenInput": "當輸入",
            "debugger.getLastInput": "最後一次輸入",
        },
        "he": {
            "debugger.extName": "מפתח בדיקות",
            "debugger.windowText": "מסוף",
            "debugger.console": "מסוף",
            "debugger.inputTip": "קלט:",
            "debugger.showConsole": "פתיחת מסוף",
            "debugger.breakpoint": "נקודת עצירה",
            "debugger.breakpointAndLog": "נקודת עצירה ורישום [message]",
            "debugger.ifFalseBreakpoint": "אם [boolean] שקר, תצורף נקודת עצירה",
            "debugger.ifFalseBreakpointAndLog": "אם [boolean] שקר, תצורף נקודת עצירה ורישום [message]",
            "debugger.clearConsole": "ניקוי מסוף",
            "debugger.output": "מסוף [type] [message]",
            "debugger.log": "רישום",
            "debugger.warn": "אזהרה",
            "debugger.error": "שגיאה",
            "debugger.outputWithColor": "פלט בצבע [color] [message]",
            "debugger.test": "בדיקה [boolean] אם שקר: [message]",
            "debugger.logStage": "רישום תמונת הבמה",
            "debugger.whenInput": "כאשר קלט",
            "debugger.getLastInput": "קבלת קלט אחרון"
        }
    });
    const formatMessage = Scratch.translate;
    const lang = (id, defaultValue) => Scratch.translate({ id: id, default: defaultValue });

    const inputIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjIiCiAgIGhlaWdodD0iMjIiCiAgIHZpZXdCb3g9IjAgMCA1LjgyMDgzMzMgNS44MjA4MzM0IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjMuMSAoOTFiNjZiMDc4MywgMjAyMy0xMS0xNikiCiAgIHNvZGlwb2RpOmRvY25hbWU9Iue7mOWbvi5zdmciCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxIgogICAgIHBhZ2Vjb2xvcj0iIzUwNTA1MCIKICAgICBib3JkZXJjb2xvcj0iI2VlZWVlZSIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjNTA1MDUwIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSIKICAgICBpbmtzY2FwZTp6b29tPSIzNy43NzI3MjciCiAgICAgaW5rc2NhcGU6Y3g9IjkuMjI2MjMzNSIKICAgICBpbmtzY2FwZTpjeT0iMTEuNjYxODUzIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDI3IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIxOTEyIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzEiIC8+PGRlZnMKICAgICBpZD0iZGVmczEiIC8+PHBhdGgKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxIgogICAgIGQ9Ik0gMS4yMjQ5MDY1LDQuOTc5ODQ5NyBDIDEuMTUzMjY5NCw0Ljk2NTQxMjkgMS4xMDg3OTU2LDQuOTIyNzM0NCAxLjA4MTM3MzgsNC44NDIxMTEgMS4wNTYzNjA2LDQuNzY4NTY5MiAxLjA1MzY3ODYsNC43Mzc1NjIyIDEuMDUzNjc4Niw0LjUyMTkyNTEgYyAwLC0wLjE3NDk3ODcgMC4wMDEzNiwtMC4yMDkzNDc5IDAuMDEwMTE4LC0wLjI1NjAwODkgQyAxLjA5NjU2OTQsNC4wOTEzNDg4IDEuMTY2MDg5NCw0LjAwMTgyOTEgMS4zNTgxNDgyLDMuODg2ODg0OSAxLjM5MjI2MzIsMy44NjY0Njc3IDEuNTE3MTg5NCwzLjc5Njk0MDcgMS42MzU3NjE5LDMuNzMyMzgwNiAyLjQ0NjYwNiwzLjI5MDg5NDIgMi42OTg2MjE1LDMuMTUyNzMwMSAyLjc0NTc2MjcsMy4xMjM4Mzc4IDIuODU0MDAwNywzLjA1NzQ5OTkgMi45MTIwMDE4LDIuOTgzMDM2OSAyLjkxMjAwMTgsMi45MTA0MTY2IGMgMCwtMC4wNzI2MiAtMC4wNTgwMDEsLTAuMTQ3MDgzMyAtMC4xNjYyMzkxLC0wLjIxMzQyMTIgQyAyLjY5ODYyMTUsMi42NjgxMDMxIDIuNDQ2NjA2LDIuNTI5OTM5IDEuNjM1NzYxOSwyLjA4ODQ1MjYgMS41MTcxODk0LDIuMDIzODkyNSAxLjM5MjI2MzIsMS45NTQzNjU1IDEuMzU4MTQ4MiwxLjkzMzk0ODMgMS4xNjYwODk0LDEuODE5MDA0MSAxLjA5NjU2OTQsMS43Mjk0ODQ0IDEuMDYzNzk2OSwxLjU1NDkxNyAxLjA1NTAzNywxLjUwODI1NiAxLjA1MzY3ODYsMS40NzM4ODY4IDEuMDUzNjc4NiwxLjI5ODkwODIgYyAwLC0wLjIxNTYzNzIgMC4wMDI2OCwtMC4yNDY2NDQyIDAuMDI3Njk1LC0wLjMyMDE4NjAyIDAuMDMzMzk1LC0wLjA5ODE4NTkgMC4wODk4NywtMC4xMzk5MzcyOSAwLjE4ODM5MSwtMC4xMzkyNzYxOCAwLjA4NjU5Miw1LjgxMDZlLTQgMC4xMjQ2MjI1LDAuMDE2OTM1MyAwLjQ0Mzg1MSwwLjE5MDg2NzIgMC4xNTI4MjUsMC4wODMyNjcgMC4zMTkwOTQ2LDAuMTczODE2IDAuMzY5NDg3OSwwLjIwMTIyMDUgMC4wNTAzOTMsMC4wMjc0MDQgMC40MDIwNjg3LDAuMjE5MDE5OSAwLjc4MTUwMDgsMC40MjU4MTIgMC4zNzk0MzIxLDAuMjA2NzkyMiAwLjc3NDc2MzcsMC40MjIxNjY4IDAuODc4NTE0NiwwLjQ3ODYxMDIgMC45MjM4MTE5LDAuNTAyNTc5MyAxLjAwMjI0MzEsMC41NDYwOSAxLjA1NjM3MzUsMC41ODYwMzY3IDAuMTYyNzI3MiwwLjEyMDA4ODIgMC4xNjI3MjcyLDAuMjU2NzU5OSAwLDAuMzc2ODQ4IEMgNC43NDUzNjIyLDMuMTM4Nzg3MyA0LjY2NjkzMSwzLjE4MjI5OCAzLjc0MzExOTEsMy42ODQ4NzczIDMuNjM5MzY4MiwzLjc0MTMyMDcgMy4yNDQwMzY2LDMuOTU2Njk1MyAyLjg2NDYwNDUsNC4xNjM0ODc1IDIuNDg1MTcyNCw0LjM3MDI3OTYgMi4xMzM0OTcxLDQuNTYxODk1MSAyLjA4MzEwMzcsNC41ODkyOTk1IDIuMDMyNzEwNCw0LjYxNjcwNCAxLjg2NjQ0MDgsNC43MDcyNTMyIDEuNzEzNjE1OCw0Ljc5MDUyIDEuNDkyMjAzMyw0LjkxMTE1NjggMS40MjQzMTUsNC45NDU2Nzc0IDEuMzc5NDU2OCw0Ljk2MDQzNyAxLjMxOTExNzUsNC45ODAyOTAzIDEuMjYyNDI3LDQuOTg3NDExIDEuMjI0OTA2NSw0Ljk3OTg0OTcgWiIKICAgICBpZD0icGF0aDEiIC8+PC9zdmc+Cg==';
    const closeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUwLjIgKDU1MDQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJjbG9zZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTE1LjQ2NDkzNSwxNS40NjcyOTcgQzE0Ljc2NDQwNTksMTYuMTc3NzcwNSAxMy42MTg1ODc3LDE2LjE3Nzc3MDUgMTIuOTA4MTE0MiwxNS40NjcyOTcgTDkuOTk4ODE4OTksMTIuNTU4MDAxOCBMNy4wODg0MTg4NSwxNS40NjcyOTcgQzYuMzgyMzY1MDYsMTYuMTczMzUwOCA1LjIzNzY1MTg3LDE2LjE3MzM1MDggNC41MzE1OTgwNywxNS40NjcyOTcgQzQuMTc5MTIzNjQsMTUuMTE0ODIyNiA0LjAwMDEyNDA5LDE0LjY0ODUzOTggNC4wMDAxMjQwOSwxNC4xODg4ODY2IEM0LjAwMDEyNDA5LDEzLjcyODEyODUgNC4xNzkxMjM2NCwxMy4yNjI5NTA2IDQuNTMxNTk4MDcsMTIuOTEwNDc2MiBMNy40NDA4OTMyOCwxMC4wMDExODEgTDQuNTI3MTc4MzMsNy4wODYzNjExMiBDNC4xNzM1OTg5Nyw2LjczMjc4MTc2IDMuOTk0NTk5NDEsNi4yNjc2MDM5MSA0LjAwMDEyNDA5LDUuODAyNDI2MDYgQzQuMDAwMTI0MDksNS4zNDE2Njc5NSA0LjE3MzU5ODk3LDQuODgyMDE0NzcgNC41MjcxNzgzMyw0LjUyOTU0MDM0IEM1LjIzMjEyNzE5LDMuODIzNDg2NTUgNi4zNzY4NDAzOCwzLjgyMzQ4NjU1IDcuMDgzOTk5MTEsNC41Mjk1NDAzNCBMOS45OTg4MTg5OSw3LjQ0MzI1NTI5IEwxMi45MTI1MzM5LDQuNTI5NTQwMzQgQzEzLjYxODU4NzcsMy44MjM0ODY1NSAxNC43NjQ0MDU5LDMuODIzNDg2NTUgMTUuNDcwNDU5Nyw0LjUyOTU0MDM0IEMxNi4xNzY1MTM0LDUuMjM0NDg5MiAxNi4xNzY1MTM0LDYuMzgwMzA3MzMgMTUuNDcwNDU5Nyw3LjA4NjM2MTEyIEwxMi41NTQ1MzQ4LDEwLjAwMTE4MSBMMTUuNDcwNDU5NywxMi45MTQ4OTYgQzE2LjE3NjUxMzQsMTMuNjIwOTQ5NyAxNi4xNzY1MTM0LDE0Ljc1NTcxODUgMTUuNDY0OTM1LDE1LjQ2NzI5NyIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=';
    const clearIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGQ9Ik00LjU0OCA3aDEwLjkwNGEuNS41IDAgMCAxIC40OTguNTQ1bC0uNzg1IDguNjM1QTIgMiAwIDAgMSAxMy4xNzQgMThINi44MjdhMiAyIDAgMCAxLTEuOTkyLTEuODJMNC4wNSA3LjU0NkEuNS41IDAgMCAxIDQuNTQ4IDd6bTIuNzg1LTMgLjU1My0xLjY1OEEuNS41IDAgMCAxIDguMzYgMmgzLjI4YS41LjUgMCAwIDEgLjQ3NC4zNDJMMTIuNjY3IDRIMTYuNWEuNS41IDAgMCAxIC41LjV2MWEuNS41IDAgMCAxLS41LjVoLTEzYS41LjUgMCAwIDEtLjUtLjV2LTFhLjUuNSAwIDAgMSAuNS0uNWgzLjgzM3ptMS4wNTQgMGgzLjIyNmwtLjMzNC0xSDguNzIxbC0uMzM0IDF6TTEwIDExLjcybDEuNTk1LTEuNTk1YS41LjUgMCAwIDEgLjcwNyAwbC4wNzMuMDczYS41LjUgMCAwIDEgMCAuNzA3TDEwLjc4IDEyLjVsMS41OTUgMS41OTVhLjUuNSAwIDAgMSAwIC43MDdsLS4wNzMuMDczYS41LjUgMCAwIDEtLjcwNyAwTDEwIDEzLjI4bC0xLjU5NSAxLjU5NWEuNS41IDAgMCAxLS43MDcgMGwtLjA3My0uMDczYS41LjUgMCAwIDEgMC0uNzA3TDkuMjIgMTIuNWwtMS41OTUtMS41OTVhLjUuNSAwIDAgMSAwLS43MDdsLjA3My0uMDczYS41LjUgMCAwIDEgLjcwNyAwTDEwIDExLjcyeiIgaWQ9ImEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+PHVzZSB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIiBmaWxsPSIjRkZGIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=';

    const getDarkMode = () => {
        try {
            let theme = JSON.parse(localStorage.getItem('tw:theme'));
            return theme.gui === 'dark';
        }
        catch (error) {
            return localStorage.getItem('tw:theme') === 'dark'; // 兼容旧版本 TW
        }
    };

    const rtlLang = ['ar', 'fa', 'he', 'ckb'];
    let isDark = getDarkMode();
    let isRTL = rtlLang.includes(localStorage.getItem('tw:language'));

    let consoleWindow = document.createElement('div');
    consoleWindow.style.position = 'fixed';
    consoleWindow.style.top = '50%';
    consoleWindow.style.left = '50%';
    consoleWindow.style.transform = 'translate(-50%, -50%)';
    consoleWindow.style.width = '600px';
    consoleWindow.style.height = '400px';
    consoleWindow.style.overflow = 'auto';
    consoleWindow.style.borderRadius = '10px';
    consoleWindow.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    consoleWindow.style.display = 'none';
    consoleWindow.style.fontFamily = 'Cascadia Code, Consolas, Courier New, Menlo, 等线, monospace';
    consoleWindow.style.paddingBottom = '5px';
    consoleWindow.style.overflowX = 'hidden';
    consoleWindow.style.zIndex = 999;
    document.body.appendChild(consoleWindow);

    let isDragging = false; // 标记是否正在拖动
    let offset = { x: 0, y: 0 }; // 鼠标点击位置与窗口左上角的偏移量

    // 创建标题栏
    let titleBar = document.createElement('div');
    titleBar.style.height = '40px';
    titleBar.style.lineHeight = '40px';
    titleBar.style.padding = '0 12px';
    titleBar.style.cursor = 'move';
    titleBar.style.fontSize = '16px';
    titleBar.innerText = lang('debugger.windowText', 'console');
    titleBar.style.position = 'sticky';
    titleBar.style.top = '0px';
    consoleWindow.appendChild(titleBar);
    
    // 创建内容区域
    let content = document.createElement('div');
	content.style.position = 'absolute';
    content.style.width = '100%';
    content.style.height = '360px';
	// content.style.backgroundColor = '#FF0000';
	content.style.bottom = '0';
	content.style.overflow = 'auto';
	content.style.paddingTop = '5px';
	consoleWindow.appendChild(content);
	
    // 创建关闭按钮
    let closeButton = document.createElement('img');
    closeButton.src = closeIcon;
    closeButton.style.position = 'absolute';
    closeButton.style.top = '12px';
    closeButton.style.width = '16px';
    closeButton.style.height = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.classList.add('icon');
    titleBar.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
        consoleWindow.style.display = 'none';
        inputWindow.style.display = 'none'
    });

    // 创建清空按钮
    let clearButton = document.createElement('img');
    clearButton.src = clearIcon;
    clearButton.style.position = 'absolute';
    clearButton.style.top = '12px';
    clearButton.style.width = '16px';
    clearButton.style.height = '16px';
    clearButton.style.cursor = 'pointer';
    clearButton.classList.add('icon');
    titleBar.appendChild(clearButton);

    clearButton.addEventListener('click', () => {
        // 清空控制台
        clearConsoleText();
    });

    // 创建输入按钮
    let inputButton = document.createElement('img');
    inputButton.src = inputIcon;
    inputButton.style.position = 'absolute';
    inputButton.style.top = '12px';
    inputButton.style.width = '16px';
    inputButton.style.height = '16px';
    inputButton.style.cursor = 'pointer';
    inputButton.classList.add('icon');
    titleBar.appendChild(inputButton);

    // 创建输入内容的窗口
    let inputWindow = document.createElement('div');
    inputWindow.style.position = 'absolute';
    inputWindow.style.top = `calc(${consoleWindow.style.top} + 228px)`;
    inputWindow.style.transform = 'translate(-50%, -50%)';
    inputWindow.style.width = '400px';
    inputWindow.style.height = '30px';
    inputWindow.style.overflow = 'hidden';
    inputWindow.style.overflowX = 'hidden';
    inputWindow.style.boxShadow = '0 0 10px 4px rgba(0, 0, 0, 0.2)';
    inputWindow.style.borderRadius = '10px';
    inputWindow.style.display = 'none';
    inputWindow.style.paddingBottom = '5px';
    inputWindow.style.zIndex = '1000';
    inputWindow.style.userSelect = 'none';
    document.body.appendChild(inputWindow);

    let inputWindowIcon = document.createElement('img');
    inputWindowIcon.src = inputIcon;
    inputWindowIcon.style.position = 'absolute';
    inputWindowIcon.style.width = '22px';
    inputWindowIcon.style.height = '22px';
    inputWindowIcon.style.top = '6px';
    inputWindowIcon.classList.add('icon');
    inputWindow.appendChild(inputWindowIcon);

    // 创建输入框
    let inputBox = document.createElement('input');
    inputBox.style.position = 'absolute';
    inputBox.style.width = 'calc(100% - 40px)';
    inputBox.style.height = '30px';
    inputBox.style.background = '#FFFFFF00';
    inputBox.style.fontFamily = 'Cascadia Code, Consolas, Courier New, Menlo, 等线, monospace';
    inputBox.style.borderColor = 'transparent';
    inputBox.style.outline = 'none';
    inputWindow.appendChild(inputBox);

    // 提交
    inputBox.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // 阻止默认的行为

            let messageText = inputBox.value;

            addText({ message: messageText, bullet: '>' });  // 添加

            inputBox.value = '';
            lastInput = messageText;
            vm.runtime.startHats('debugger_whenInput');
        }
    });

    // 输入控制按钮
    inputButton.addEventListener('click', () => {
        const iptWdSty = inputWindow.style;
        if (iptWdSty.display === 'none') iptWdSty.display = 'block';
        else iptWdSty.display = 'none';
    });

    let lastInput = '';

    titleBar.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    function handleMouseDown(event) {
        if (event.target === titleBar) {
            isDragging = true;

            // 计算鼠标点击位置与窗口左上角的偏移量
            offset.x = event.clientX - consoleWindow.offsetLeft;
            offset.y = event.clientY - consoleWindow.offsetTop;
        }
    }

    function handleMouseMove(event) {
        if (isDragging) {
            event.preventDefault(); // 取消默认行为

            // 计算窗口新的位置
            const newX = event.clientX - offset.x;
            const newY = event.clientY - offset.y;

            // 更新窗口位置
            consoleWindow.style.left = newX + 'px';
            consoleWindow.style.top = newY + 'px';

            // 更新输入窗口的位置
            inputWindow.style.top = `calc(${consoleWindow.style.top} + 228px)`;
            inputWindow.style.left = !isRTL ? `calc(${getComputedStyle(consoleWindow).left} - 100px)` : 'auto';
            inputWindow.style.right = isRTL ? `calc(${getComputedStyle(consoleWindow).right} + 100px)` : 'auto';
        }
    }

    function handleMouseUp() {
        isDragging = false;
    }

    function clearConsoleText() {
		content.innerHTML = '';
    }

    function addText({ message, color, bullet = '' }) {
        const logElement = document.createElement('div');
        logElement.style.color = color;
        logElement.style.fontSize = '16px';
        logElement.style.paddingLeft = '10px';
        logElement.style.paddingRight = '10px';
        logElement.innerText = `${bullet}\t${message}`;
        content.appendChild(logElement);
        
        if (content.children.length > maxMessage) {
            content.removeChild(content.children[0])
        }
    }

    function addImg(base64ImageData) {
        const imageElement = document.createElement('img');
        imageElement.src = base64ImageData;
        imageElement.style.borderRadius = '10px';
        imageElement.style.width = '150px';
        imageElement.style.margin = '10px';
        content.appendChild(imageElement);

        content.appendChild(document.createElement('br'));
        
        if (content.children.length > maxMessage) {
            content.removeChild(content.children[1])
        }
    }

    const consoleBlockColor = {
        color1: '#808080',
        color2: '#737373',
        color3: '#666666'
    }
    
    let maxMessage = 100;

    class ExtensionBlocks {
        getInfo() {
            return {
                color1: '#54A621',
                color2: '#4C951E',
                color3: '#43851A',
                id: 'debugger',
                name: lang('debugger.extName', 'debugger'),
                blocks: [
                    {
                        func: 'showConsole',
                        blockType: BlockType.BUTTON,
                        text: lang('debugger.showConsole', 'show console')
                    },
                    {
                        opcode: 'breakpoint',
                        blockType: BlockType.COMMAND,
                        text: lang('debugger.breakpoint', 'breakpoint')
                    },
                    {
                        opcode: 'breakpointAndLog',
                        blockType: BlockType.COMMAND,
                        text: lang('debugger.breakpointAndLog', 'breakpoint and log [message]'),
                        arguments: {
                            message: {
                                type: ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'ifFalseBreakpoint',
                        blockType: BlockType.COMMAND,
                        text: lang('debugger.ifFalseBreakpoint', 'if [boolean] is false, then breakpoint'),
                        arguments: {
                            boolean: {
                                type: ArgumentType.BOOLEAN
                            }
                        }
                    },
                    {
                        opcode: 'ifFalseBreakpointAndLog',
                        blockType: BlockType.COMMAND,
                        text: lang('debugger.ifFalseBreakpointAndLog', 'if [boolean] is false, then breakpoint and log [message]'),
                        arguments: {
                            boolean: {
                                type: ArgumentType.BOOLEAN
                            },
                            message: {
                                type: ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        blockType: BlockType.LABEL,
                        text: lang('debugger.console', 'Console')
                    },
                    {
                        opcode: 'clearConsole',
                        ...consoleBlockColor,
                        blockType: BlockType.COMMAND,
                        text: lang('debugger.clearConsole', 'clear console')
                    },
                    {
                        opcode: 'output',
                        ...consoleBlockColor,
                        blockType: BlockType.COMMAND,
                        text: lang('debugger.output', 'console [type] [message]'),
                        arguments: {
                            type: {
                                type: ArgumentType.STRING,
                                menu: 'outputType'
                            },
                            message: {
                                type: ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'outputWithColor',
                        ...consoleBlockColor,
                        blockType: BlockType.COMMAND,
                        text: lang('debugger.outputWithColor', 'output [message] color [color]'),
                        arguments: {
                            message: {
                                type: ArgumentType.STRING,
                                defaultValue: ''
                            },
                            color: {
                                type: ArgumentType.COLOR,
                                defaultValue: '#61AFEF'
                            }
                        }
                    },
                    {
                        opcode: 'test',
                        ...consoleBlockColor,
                        blockType: BlockType.COMMAND,
                        text: lang('debugger.test', 'test [boolean] if false: [message]'),
                        arguments: {
                            boolean: {
                                type: ArgumentType.BOOLEAN,
                            },
                            message: {
                                type: ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'logStage',
                        ...consoleBlockColor,
                        blockType: BlockType.COMMAND,
                        text: lang('debugger.logStage', 'log stage')
                    },
                    '---',
                    {
                        opcode: 'whenInput',
                        ...consoleBlockColor,
                        blockType: BlockType.EVENT,
                        isEdgeActivated: false,
                        text: '[ICON]' + lang('debugger.whenInput', 'when input'),
                        arguments: {
                            ICON: {
                                type: ArgumentType.IMAGE,
                                dataURI: inputIcon,
                                flipRTL: true
                            }
                        }
                    },
                    {
                        opcode: 'getLastInput',
                        ...consoleBlockColor,
                        blockType: BlockType.REPORTER,
                        text: '[ICON]' + lang('debugger.getLastInput', 'get last input'),
                        arguments: {
                            ICON: {
                                type: ArgumentType.IMAGE,
                                dataURI: inputIcon,
                                flipRTL: true
                            }
                        }
                    }
                ],
                menus: {
                    outputType: {
                        acceptReporters: false,
                        items: [
                            {
                                text: formatMessage({
                                    id: 'debugger.log',
                                    default: 'log'
                                }),
                                value: 'log'
                            },
                            {
                                text: formatMessage({
                                    id: 'debugger.warn',
                                    default: 'warn'
                                }),
                                value: 'warn'
                            },
                            {
                                text: formatMessage({
                                    id: 'debugger.error',
                                    default: 'error'
                                }),
                                value: 'error'
                            }
                        ]
                    },
                }
            };
        }

        showConsole() {
            isDark = getDarkMode();
            isRTL = rtlLang.includes(localStorage.getItem('tw:language'));
            consoleWindow.style.display = 'block';
            consoleWindow.style.left = '50%'
            consoleWindow.style.top = '50%';
            inputWindow.style.top = `calc(${consoleWindow.style.top} + 228px)`;
            inputWindow.style.left = `calc(${consoleWindow.style.left} - 100px)`;
            inputWindow.style.left = !isRTL ? `calc(${getComputedStyle(consoleWindow).left} - 100px)` : 'auto';
            inputWindow.style.right = isRTL ? `calc(${getComputedStyle(consoleWindow).right} + 100px)` : 'auto';
            if (isRTL) {
                consoleWindow.style.direction = 'rtl';
                inputWindow.style.direction = 'rtl';
                inputWindowIcon.style.transform = 'scaleX(-1)';
                closeButton.style.left = '12px';
                closeButton.style.right = 'auto';
                clearButton.style.left = '60px';
                clearButton.style.right = 'auto';
                inputButton.style.left = '108px';
                inputButton.style.right = 'auto';
                inputButton.style.transform = 'scaleX(-1)';
                inputBox.style.left = 'auto';
                inputBox.style.right = '40px';
                inputWindowIcon.style.left = 'auto';
                inputWindowIcon.style.right = '12px';
            } else {
                consoleWindow.style.direction = 'ltr';
                inputWindow.style.direction = 'ltr';
                inputWindowIcon.style.transform = 'scaleX(1)';
                closeButton.style.left = 'auto';
                closeButton.style.right = '12px';
                clearButton.style.left = 'auto';
                clearButton.style.right = '60px';
                inputButton.style.left = 'auto';
                inputButton.style.right = '108px';
                inputButton.style.transform = 'scaleX(1)';
                inputBox.style.left = '40px';
                inputBox.style.right = 'auto';
                inputWindowIcon.style.left = '12px';
                inputWindowIcon.style.right = 'auto';
            }
            if (isDark) {
                consoleWindow.style.backgroundColor = '#111111';
                consoleWindow.style.color = '#FFF';
                titleBar.style.backgroundColor = '#1E1E1E';
                titleBar.style.color = '#FFF';
                closeButton.style.filter = 'none';
                clearButton.style.filter = 'none';
                inputButton.style.filter = 'none';
                inputWindow.style.backgroundColor = '#111111';
                inputWindow.style.color = '#FFF';
                inputWindowIcon.style.filter = 'none';
            }
            else {
                consoleWindow.style.backgroundColor = '#FAFAFA';
                consoleWindow.style.color = '#474747';
                titleBar.style.backgroundColor = '#CDCDCD';
                titleBar.style.color = '#000';
                closeButton.style.filter = 'invert(1)';
                clearButton.style.filter = 'invert(1)';
                inputButton.style.filter = 'invert(1)';
                inputWindow.style.backgroundColor = '#FAFAFA';
                inputWindow.style.color = '#474747';
                inputWindowIcon.style.filter = 'invert(1)';
            }
        }

        breakpoint() {
            const pauseButtonSelector = vm.runtime.isPackaged ? '[class*="pause-button"]' : 'img.pause-btn.addons-display-none-pause';
            const pauseButton = document.querySelector(pauseButtonSelector);

            if (pauseButton) {
                pauseButton.click();
            }
        }

        breakpointAndLog({ message }) {
            this.output({ type: 'log', message: message });
            this.breakpoint();
        }

        ifFalseBreakpoint({ boolean }) {
            boolean = Cast.toBoolean(boolean);
            if (!boolean) this.breakpoint();
        }

        ifFalseBreakpointAndLog({ boolean, message }) {
            boolean = Cast.toBoolean(boolean);
            if (!boolean) {
                this.output({ type: 'log', message: message });
                this.breakpoint();
            }
        }

        clearConsole() {
            clearConsoleText();
        }

        output({ type, message }) {
            if (type === 'log') {
                addText({ message: message });
                return;
            }
            const OutputColor = {
                log: '#FFFFFF',
                warn: '#E5C07B',
                error: '#E06C75'
            };
            addText({
                message: message,
                color: OutputColor[type]
            });
        }

        outputWithColor(args) {
            addText(args);
        }

        test({ boolean, message }) {
            if (!Cast.toBoolean(boolean)) {
                addText({
                    message: message,
                    color: '#E06C75'
                });
            }
        }

        logStage() {
            new Promise((resolve) => {
                vm.runtime.renderer.requestSnapshot((uri) => {
                    resolve(uri);
                });
            }).then((base64ImageData) => {
                addImg(base64ImageData);
            });
        }

        getLastInput() {
            return lastInput;
        }
    }

    Scratch.extensions.register(new ExtensionBlocks());
})(Scratch);
