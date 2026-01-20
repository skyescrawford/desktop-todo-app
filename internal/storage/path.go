// internal/storage/path.go
package storage

import (
	"log"
	"os"
	"path/filepath"
)

func AppDataDir(appName string) (string, error) {
	dir, err := os.UserConfigDir()
	if err != nil {
		return "", err
	}

	appDir := filepath.Join(dir, appName)
	log.Println(appDir)
	err = os.MkdirAll(appDir, 0755)
	if err != nil {
		return "", err
	}

	return appDir, nil
}
