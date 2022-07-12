#!/usr/bin/env node
 
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是 Linux 或 maxOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js
 
// 脚手架的工作过程:
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答的结果生成文件
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([ // 1. 通过命令行交互询问用户问题
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
])
.then(answers => { // 2. 根据用户回答的结果生成文件
    
    // 模板目录
    const tmlDir = path.join(__dirname, '../src/views')
    console.log(tmlDir)
    
    // 目标目录
    const destDir = process.cwd()
    console.log(destDir)
    
    // 将模板下文件全部转换到目标目录
    fs.readdir(tmlDir, (err, files) => {
        if(err) throw err
        files.forEach(file => {
            // 通过模板引擎渲染文件 此处使用ejs模板引擎
            ejs.renderFile(path.join(tmlDir, file), answers, (err, result) => {
                if(err) throw err
                
                // 将渲染结果写入文件
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})