## All-in-One 模式

对于首次接触 KubeSphere 的用户，想寻找一个最快安装和体验 KubeSphere 核心功能的方式，all-in-one 模式可一键安装 KubeSphere 和 Kubernetes v1.15.5 至一台目标机器。

> 提示：
> - KubeSphere 2.1 已支持 `自定义安装各个功能组件`，用户可根据**业务需求和机器配置选择安装所需的组件**，默认仅开启`最小化安装`，参考 [安装说明](https://kubesphere.io/docs/v2.1/zh-CN/installation/intro/) 开启可选组件的安装。
> - 若在云平台使用在线安装，可通过调高带宽的方式来加快安装速度。

## 前提条件

检查安装机器的网络防火墙是否已关闭，若未关闭防火墙则需要开放相关的指定端口，参考 [需开放的端口](https://kubesphere.io/docs/v2.1/zh-CN/installation/port-firewall/)。

## 第一步: 准备主机

您可以参考以下节点规格准备一台符合要求的主机节点开始 `all-in-one` 模式的安装，为防止软件版本冲突，**建议您选择一台干净的机器**。

> 说明：
> - 若使用 ubuntu 16.04 建议使用其最新的版本 16.04.5；
> - 若使用 ubuntu 18.04，则需要使用 root 用户；
> - 若 Debian 系统未安装 sudo 命令，则需要在安装前使用 root 用户执行 `apt update && apt install sudo` 命令安装 sudo 命令后再进行安装。

| 操作系统 | 最小配置 |
| --- | --- |
|CentOS 7.5 (64 bit) | CPU：2 核， 内存：4 G， 系统盘：100 G |
|Ubuntu 16.04/18.04 LTS (64 bit) | CPU：2 核， 内存：4 G， 系统盘：100 G  |
|Red Hat Enterprise Linux Server 7.4 (64 bit) |  CPU：2 核， 内存：4 G， 系统盘：100 G  |
|Debian Stretch 9.5 (64 bit)| CPU：2 核， 内存：4 G， 系统盘：100 G  |



## 第二步: 准备安装包

下载 `KubeSphere 2.1.0` 安装包至待安装机器，进入安装目录。

```bash
$ curl -L https://kubesphere.io/download/stable/v2.1.0 > installer.tar.gz \
&& tar -zxf installer.tar.gz && cd kubesphere-all-v2.1.0/scripts
```


## 第三步: 安装 KubeSphere

KubeSphere 安装过程中将会自动化地进行环境和文件监测、平台依赖软件的安装、Kubernetes 和 etcd 的自动化安装，以及存储的自动化配置，安装成功后可通过 KubeSphere 控制台右上角点击关于查看安装的版本。

> 说明：
> - 通常情况您不需要修改任何配置，直接安装即可。
> - 网络插件默认是 `calico`，若您需要自定义安装参数，如网络、存储、负载均衡器插件、可选组件等相关配置需在 **`conf/common.yaml`** 文件中指定或修改，参考 [集群组件配置说明](https://kubesphere.io/docs/v2.1/zh-CN/installation/vars/)。
> - 存储默认用 [OpenEBS](https://openebs.io/) 基于 [Local Volume](https://kubernetes.io/docs/concepts/storage/volumes/#local) 提供持久化存储服务，OpenEBS 支持 [动态申请 PV](https://docs.openebs.io/docs/next/uglocalpv.html#Provision-OpenEBS-Local-PV-based-on-hostpath)，**方便初次安装但没有准备存储服务端的场景下进行部署测试**，正式环境建议 [配置持久化存储](https://kubesphere.io/docs/v2.1/zh-CN/installation/storage-configuration/)。
> - 由于 Kubernetes 集群的 Cluster IP 子网网段默认是 `10.233.0.0/18`，Pod 的子网网段默认是 `10.233.64.0/18`，因此安装 KubeSphere 的节点 IP 地址范围不应与以上两个网段有重复，若遇到地址范围冲突可在配置文件 `conf/vars.yaml` 修改 `kube_service_addresses` 或 `kube_pods_subnet` 的参数。


参考以下步骤开始 all-in-one 安装：

> 说明：安装时间跟网络情况和带宽、机器配置、安装节点个数等因素有关，已测试过的 all-in-one 模式，在网络良好的情况下以规格列表最小配置安装用时大约为 25 分钟。

**1.** 建议使用 `root` 用户安装，执行 `install.sh` 脚本：

```bash
$ ./install.sh
```

**2.** 输入数字 `1` 选择第一种即 all-in-one 模式开始安装：

```bash
################################################
         KubeSphere Installer Menu
################################################
*   1) All-in-one
*   2) Multi-node
*   3) Quit
################################################
https://kubesphere.io/               2019-10-14
################################################
Please input an option: 1

```

**3.** 测试 KubeSphere 单节点安装是否成功：

**(1)** 待安装脚本执行完后，当看到如下 `"Successful"` 界面，则说明 KubeSphere 安装成功。

```bash
successsful!
#####################################################
###              Welcome to KubeSphere!           ###
#####################################################

Console: http://192.168.0.8:30880
Account: admin
Password: P@88w0rd

NOTE：Please modify the default password after login.
#####################################################
```
> 提示：如需要再次查看以上的界面信息，可在安装包目录下执行 `cat kubesphere/kubesphere_running` 命令查看。

**(2)** 若需要在外网访问，在云平台需要在端口转发规则中将 **内网端口** 30880 转发到 **源端口** 30880，然后在防火墙开放这个 **源端口**，确保外网流量可以通过该端口。


**(3)** 安装成功后，浏览器访问对应的 URL，如 `http://{$IP}:30880`，即可进入 KubeSphere 登录界面，可使用默认的用户名和密码登录 KubeSphere 控制台体验，**登录后请立即修改默认密码**。参阅 [快速入门](https://kubesphere.io/docs/v2.1/zh-CN/quick-start/quick-start-guide/) 帮助您快速上手 KubeSphere。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20191020153911.png)

<font color=red>注意：登陆 Console 后请在 "集群状态" 查看服务组件的监控状态，待所有组件启动完成后即可开始使用，通常所有服务组件都将在 10 分钟内启动完成。</font>

![](https://pek3b.qingstor.com/kubesphere-docs/png/20191014095317.png)
