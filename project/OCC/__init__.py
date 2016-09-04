VERSION = "0.16.0"
import os
import sys
import numbers
import platform
import functools
import itertools

from functools import reduce

python_distribution = os.path.join(platform.system().lower(),
	platform.architecture()[0],
	'python%s.%s' % platform.python_version_tuple()[:2])
sys.path.append(os.path.abspath(os.path.join(
	os.path.dirname(__file__),
	'lib', python_distribution)))