# Yarn Workspace + Lerna

在**GitHub**上创建一个仓库，并使用**Yarn Workspaces**和**Lerna**来组织和管理多个相关的**JavaScript**包/模块的项目是一种常见的做法，特别是在大型前端项目中。以下是创建和设置这样的仓库的一般步骤：

- 步骤 1：在**GitHub**上创建仓库

  登录到**GitHub**。  
   点击页面右上角的加号图标，然后选择“New Repository”创建一个新仓库。  
   提供仓库的名称、描述、可见性等信息，并选择创建一个空仓库。

- 步骤 2：克隆仓库到本地

  打开终端。  
   使用`git clone`命令克隆新创建的**GitHub**仓库到本地：

  ```bash
      git clone <仓库的URL>
  ```

- 步骤 3：初始化**Yarn Workspaces**

  进入克隆下来的仓库的目录：

  ```bash
      cd <仓库目录>
  ```

  使用以下命令初始化**Yarn Workspaces**：

  ```bash
      yarn init -y
  ```

- 步骤 4：安装**Lerna**

  使用以下命令全局安装**Lerna**（如果尚未安装）：

  ```bash
      yarn global add lerna
  ```

- 步骤 5：配置**Lerna**

  在项目根目录下创建一个`lerna.json`文件，用于配置**Lerna**。示例配置如下：

  ```json {.line-numbers}
  {
    "packages": ["packages/*"],
    "version": "independent",
    "npmClient": "yarn",
    "useWorkspaces": true
  }
  ```

- 步骤 6：创建工作区包

  在项目根目录下创建一个**packages**文件夹，用于存放各个子包。  
   在**packages**文件夹下创建子包（每个子包都是一个独立的**JavaScript**项目）。  
   在每个子包的目录中初始化一个独立的**Yarn**项目，并编写你的代码。

- 步骤 7：使用**Lerna**管理子包

  使用**Lerna**命令来管理子包，例如，使用以下命令添加一个新的子包：

  ```bash
      lerna create <package-name>
  ```

  使用`lerna add`命令来在不同的子包之间添加依赖关系。  
   使用`lerna run`命令在所有子包中执行脚本。

- 步骤 8：将项目推送到**GitHub**

  使用`git add`和`git commit`命令来提交你的更改。  
   使用`git push`命令将更改推送到**GitHub**仓库。

现在，你已经在**GitHub**上创建了一个仓库，并使用**Yarn Workspaces**和**Lerna**来组织和管理多个子包的项目。这将允许你在一个仓库中管理多个相关的**JavaScript**包/模块，并更轻松地进行开发、测试和部署。

## Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
