#!/bin/bash
set -eux
declare currentDir=$(cd $(dirname $0);pwd)
declare dirName=$(basename "${currentDir}")
declare parentDir=$(dirname "${currentDir}")
declare testRuleName="test-rule-name";

# test
cd ${currentDir}
yes "" | node ${parentDir}/bin/cmd.js "${testRuleName}"
$(npm bin)/rimraf "${currentDir}/textlint-rule-${testRuleName}"
