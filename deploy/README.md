# Deployment

## Initial Setup

The following steps need to be done once when setting up the Raspberry Pi. After that, Ansible takes over.

### 1. Install Raspberry Pi OS Lite

The lite version of the OS is quite enough for hosting the site. Setup SSH access with the `pi` user with a strong password.

### 2. Reserve static internal IP for Raspberry Pi from the router

The router provides an internal IP address for the Pi, which needs to be made static so it doesn't change when to Pi boots.

### 3. Log in and find out external IP

Run:

```
ssh pi@[IP address from 2 here]
```

to access the Rasperrby pi. To get the external IP adress run:

```
curl -4 icanhazip.com
```

and log out with `exit`.

### 4. Setup Cloudflare DNS with the IP

In Cloudflare DNS settings, set A record to your domain to point to the IP address you got from 3. Set a short TTL, e.g. 1min to force refetch on dynamic IP changes.

### 5. Configure Router SSH Port Forwarding

Your router probably isn't forwarding SSH by default to to the Raspberry pi, so set up forwarding of port 22 to Raspberry Pi port 22.

Also port forward HTTP port 80 and HTTPS port 443.

### 6. Log In to Your Domain

Run:

```
ssh pi@[your domain]
```

to access the Raspberry Pi from the outside.

### 7. Setup SSH Key Access

Create new SSH keys to `~/.ssh/id_rsa_pi` with:

```
ssh-keygen
```

and then copy the file to the Raspberry Pi with:

```
ssh-copy-id -i ~/.ssh/id_rsa_pi pi@[your domain]
```

After that add to ~/.ssh/config

```
Host [your domain]
   Hostname [your domain]
   User pi
   PubkeyAuthentication yes
   Port 22
   IdentityFile ~/.ssh/id_rsa_pi
```

and you should be able to `ssh [your domain]` to log in.

### 8. Upgrade to Debian Bookworm

If Rasperry OS is still using Debian Bullseye, it has a too old glibc v2.31 when at least v2.32 is needed. To fix this edit:

```
/etc/apt/sources.list
```

and change `bullseye` to `bookworm`. After that run:

```
sudo apt update
sudo apt upgrade
sudo apt dist-upgrade
```

and reboot.

## Ansible Setup

Once there is a way to access the Raspberry Pi with SSH keys from the internet, and glibc version is new enough, use the following playbooks to configure it.

### [Initialize](./initialize.yml)

This playbook installs the needed prerequisite dependecies to Raspberry Pi OS Lite that aren't there, and sets up directories. Needs to be run once.

### [Setup Services](./setup_services.yml)

Sets up all of the custom systemd services to the Rasperry Pi OS.

### [Upgrade](./upgrade.yml)

This playbook upgrades the debian packages on the Raspberry Pi. If kernel updates, reboot is issued. [Scheduled to run nightly](../.github/workflows/upgrade.yml).
