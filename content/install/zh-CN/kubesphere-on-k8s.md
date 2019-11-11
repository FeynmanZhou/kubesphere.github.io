## 在 Kubernetes 在线部署 KubeSphere

KubeSphere 除了支持部署在 Linux 之上，还支持在已有 Kubernetes 集群之上部署 [KubeSphere](https://kubesphere.io/)。

## 准备工作

KubeSphere 支持在已有 Kubernetes 集群之上在线安装 [KubeSphere](https://kubesphere.io/)。在安装之前，请确认您的环境满足以下前提条件：


> - `Kubernetes` 版本： `1.13.0 ≤ K8s version ≤ 1.16`；
> - `Helm`，版本 `>= 2.10.0`，且已安装了 Tiller，参考 [如何安装与配置 Helm](https://devopscube.com/install-configure-helm-kubernetes/)；
> - 集群的可用 CPU > 1 C，可用内存 > 2 G；
> - 集群已有存储类型（StorageClass）；
> - 集群能够访问外网（离线安装正在开发中）。

可参考 [前提条件](https://kubesphere.io/docs/v2.1/zh-CN/installation/prerequisites/) 验证，若待安装的环境满足以上条件则可以开始部署 KubeSphere。

## 最小化安装 KubeSphere

1. 最小化安装仅需要一条命令，即可安装在 Kubernetes 之上。

```yaml
$ kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/master/kubesphere-minimal.yaml
```

2. 查看安装日志，等待安装成功。

```bash
$ kubectl logs -n kubesphere-sysbectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f
```

3. 通过 `kubectl get pod --all-namespace` 查看 kubesphere 的 namespace 下所有 Pod 状态是否为 Running。确认 Pod 都正常运行后，可使用 `IP:30880` 访问 KubeSphere UI 界面，默认的集群管理员账号为 `admin/P@88w0rd`。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20191020153911.png)


## 完整安装指南

完整安装以及参数释义，请参考 [ks-installer GitHub](https://github.com/kubesphere/ks-installer/tree/master)。
