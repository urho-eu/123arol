## 123arol

A simple app that allows to query a LoRaWAN device on a Network
Server. Only Everynet NS is supported currently.

### Getting Started

Fetch all dependencies:
```
$ yarn install
```

### Configuration

Create a .env configuration file:
```
NAME=123arol
SERVER=localhost
PORT=3000
AUTH_TOKEN=01234567890123456789012345678901
ALLOWED_USER=someuser
PASSWORD_HASH=$2b$10$Jkfo/5avIk3D.5P7LrnpJeLr8malEqVc4ZqQj.phc67aPuN3J3JG2
```

AUTH_TOKEN must be obtained from the network provider.

ALLOWED_USER is the only user that can login.

PASSWORD_HASH is a bcrypt hash of a password. This must be created and
added to .env file before the app is used.

Always restart the application after changing the .env file.

### Start

Start the app in dev mode:
```
$ yarn run dev
```

or start the app in production mode:
```
$ yarn run start
```

#### Container mode

You may run the as an OCI compliant container. You need to build a container
image first. For that please make sure you have all the necessary tools
installed. We will use podman for building the container. For more details on
what to install before using podman please refer to podman's web site.

##### Running container on x86
```
$ podman build --tag 123arol:0.0.1-x86_64 -f Dockerfile
```

Upon success you may run the container:
```
$ podman run -d --net host --name 123arol 123arol:0.0.1-x86_64
```

##### Running aarch64 container on x86

Kudos to the [Multiarch](https://github.com/multiarch/qemu-user-static) and
[QEMU](https://www.qemu.org/) projects for making it easy to run "foreign"
binaries (ie. software that was built for a different hardware architecture).

We can build 123arol for aarch64 (suitable for Raspberry Pi 3B+ and above) and
then run that image on our x86 host. This is good for testing purposes, but
the real reason of doing this is of course to prepare an aarch64 image.
That image can be shared via a container image registry and let anybody
download and install it quickly on Raspberry Pi (or other aarch64 hardware).

This is how the aarch64 variant of selfie can be built on x86:

```
$ sudo podman run --rm --privileged multiarch/qemu-user-static --reset -p yes
$ podman build --tag 123arol:0.0.1-aarch64 -f Dockerfile.aarch64
```

Upon success you may run the container using the aarch64 image:
```
$ podman run -d --net host --name 123arol 123arol:0.0.1-aarch64
```

### Deploy to K3s or Kubernetes

Coming soon.
