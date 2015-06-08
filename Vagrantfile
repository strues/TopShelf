# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  # Ubuntu 14.04 LTS
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 8000, host: 8080
  config.ssh.forward_agent = true

  # Shared Folders
  config.vm.synced_folder "./vm/", "/vagrant"

  config.vm.provider "virtualbox" do |vb|
    # vb.gui = true
    vb.memory = "512"
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provision/playbook.yml"
  end
end
