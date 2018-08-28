import sys
from subprocess import call

argFile = open('static/flags.txt', 'w')
argFile.writelines(sys.argv[1] + "\n");
argFile.close()
call("rm -f static/libdev*", shell=True)
call("sudo su teobaldo -c \'/usr/bin/python /home/teobaldo/bapcodframework_base/genJuliaLib.py /home/nodeuser/bapcod4linux/static/flags.txt\' 2>s", shell=True)
call("sudo /bin/cp /home/teobaldo/bapcodframework_base/julia_bapcod/libdevjulia.so /home/nodeuser/bapcod4linux/static/", shell=True)
