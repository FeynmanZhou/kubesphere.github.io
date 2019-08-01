## All-in-One Mode 
 
For those who are new to KubeSphere Advanced Edition and looking for the fastest way to install and experience the new features, the all-in-one mode must be your best choice since it supports one-click installation. 

## Installation Demo

<asciinema-player src="/all-in-one.json" cols="99" rows="30"></asciinema-player>

## Prerequisites

It is recommended to use the storage services which are recommended by KubeSphere and prepare the corresponding storage servers. If you are not prepare the storage servers yet, you can also use the default Local Volume as the storage only for testing installation.

### Step 1: Provision Linux Host

The following section identifies the hardware specifications and system-level requirements of one host for installation. 

- For `ubuntu 16.04` OS, it's recommended to select the latest `16.04.5`.
- If you are using ubuntu 18.04, you need to use root.
- If the Debian system does not have the sudo command installed, you need to execute the `apt update && apt install sudo` command using root before installation.

#### Hardware Recommendations

| System  | Minimum Requirements | 
| ------- | ----------- | 
| CentOS 7.5 (64 bit)         | CPU：8 Core,  Memory：16 G, Disk Space：100 G | 
| Ubuntu 16.04/18.04 LTS (64 bit)   | CPU：8 Core,  Memory：16 G, Disk Space：100 G |
| Red Hat Enterprise Linux Server 7.4 (64 bit) | CPU：8 Core,  Memory：16 G, Disk Space：100 G | 
|Debian Stretch 9.5 (64 bit)| CPU：8 Core,  Memory：16 G, Disk Space：100 G | 

### Step 2: Provision Installation Files

<div class="md-tabs">
<input type="radio" name="tabs" id="stable" checked="checked">
<label for="stable">Online Installer (2.0.2)</label>
<span class="md-tab">

Download `KubeSphere Advanced Edition 2.0.2` and enter into the installation folder.

```bash
$ curl -L https://kubesphere.io/download/stable/advanced-2.0.2 > advanced-2.0.2.tar.gz \
&& tar -zxf advanced-2.0.2.tar.gz && cd kubesphere-all-advanced-2.0.2/scripts
```
 
</span>
<input type="radio" name="tabs" id="offline">
<label for="offline">Offline Installer (2.0.2)</label>
<span class="md-tab">

Download `KubeSphere Advanced Edition 2.0.2` and enter into the installation folder.

```bash
$ curl -L https://kubesphere.io/download/offline/advanced-2.0.2 > advanced-2.0.2.tar.gz && tar -zxf advanced-2.0.2.tar.gz && cd kubesphere-all-offline-advanced-2.0.2/scripts
```

</span>
</div>

### Step 3: Get Started With Installation

All of these procedures will be automatically processing in this installation, such as the environment and file monitoring, installation of Kubernetes and etcd, and storage and network configuration, Kubernetes v1.13.5 will be installed by default. 

**Note:**

> - Generally, you can install it directly without any modification.
> - KubeSphere supports `calico` by default. If you would like to customize the configuration parameters, such as network, storage classes, etc. You will be able to specify the parameters in `vars.yml`. Otherwise it will be executed with default parameters without any modifications.
> - All-in-One uses local storage as the storage class by default. Since local storage does not support dynamic provisioning, users may need to create a persistent volume (PV) in advance when creating volumes in the KubeSphere console if PVs is insufficient, installer also pre-creates 26 pieces of available 10G PVs for testing.
> - Supported Storage Classes：[QingCloud Block Storage](https://www.qingcloud.com/products/volume/)、[QingStor NeonSAN](https://docs.qingcloud.com/product/storage/volume/super_high_performance_shared_volume/)、[GlusterFS](https://www.gluster.org/)、[CephRBD](https://ceph.com/)、[NFS](https://kubernetes.io/docs/concepts/storage/volumes/#nfs)、[Local Volume](https://kubernetes.io/docs/concepts/storage/volumes/#local). For details regarding storage configuration, please refer to [Storage Configuration Instructions](/docs/advanced-v2.0/zh-CN/installation/storage-configuration/)
> - Since the default subnet for Cluster IPs is 10.233.0.0/18, default subnet for Pod IPs is 10.233.64.0/18 in Kubernetes cluster. The node IPs must not overlap with those 2 default IPs. If any conflicts happened with the IP address, go to `conf/vars.yaml` and modify `kube_service_addresses` or `kube_pods_subnet` to avoid this senario.

Following steps describes how to get started with all-in-one:

> The installation duration is related to network conditions and bandwidth, machine configuration and the number of nodes. All-in-one mode installation was about 25 minutes after testing when the network was good condition with the minimum hardware requirements.

**1.** It's recommended to install using `root` user, then execute `install.sh`:

```
$ ./install.sh
```

**2.** Enter `1` to select `all-in-one` mode to start:

```bash
################################################
         KubeSphere Installer Menu
################################################
*   1) All-in-one
*   2) Multi-node
*   3) Quit
################################################
https://kubesphere.io/               2018-07-08
################################################
Please input an option: 1
```

**3.** Verify if all-in-one mode is installed successfully：

**(1).** If you can see the following "Successful" result being returned after `install.sh` completed, that's successful. You may need to bind the EIP and configure port forwarding. Make sure you have added the console nodeport (30880) to the firewall if the EIP has a firewall, then external network traffic can pass through this nodeport.

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

> Note: If you need to view the above interface, just execute `cat kubesphere/kubesphere_running` command in the installer directory.

**(2).** You will be able to use default account and password to log in to the KubeSphere console to experience the features, it also has an English version UI. It's highly recommended to refer to the [KubeSphere Quick Start](/docs/advanced-v2.0/zh-CN/quick-start/quick-start-guide/)， and learn how to get started with it！

![login](/login-page-en.png)

<font color=red>Note: After log in to console, please verify the monitoring status of service components in the "Cluster Status". If the service is not ready, please wait patiently. You can start to use when all components are totally ready.</font>

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190519013347.png)